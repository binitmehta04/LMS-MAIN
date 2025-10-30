// backend/app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], default: 'student' },
  enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  createdAt: { type: Date, default: Date.now }
});

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  modules: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
    resources: [{ type: String }]
  }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

// Assignment Schema
const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  dueDate: { type: Date, required: true },
  totalPoints: { type: Number, required: true },
  submissions: [{
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submissionDate: { type: Date, default: Date.now },
    content: { type: String },
    grade: { type: Number },
    feedback: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);
const Assignment = mongoose.model('Assignment', AssignmentSchema);

// Authentication middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      throw new Error();
    }
    
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

// Role-based authorization middleware
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
  };
};

// Auth Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'student'
    });
    
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Course Routes
app.post('/api/courses', auth, authorize(['instructor', 'admin']), async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    
    const course = new Course({
      title,
      description,
      instructor: req.user._id,
      modules: modules || []
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/courses', auth, async (req, res) => {
  try {
    let courses;
    
    if (req.user.role === 'student') {
      // For students, show enrolled courses
      courses = await Course.find({
        students: req.user._id
      }).populate('instructor', 'name email');
    } else if (req.user.role === 'instructor') {
      // For instructors, show courses they created
      courses = await Course.find({
        instructor: req.user._id
      });
    } else {
      // For admins, show all courses
      courses = await Course.find().populate('instructor', 'name email');
    }
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/courses/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email')
      .populate('students', 'name email');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user has access to the course
    if (req.user.role === 'student' && 
        !course.students.some(student => student._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/courses/:id', auth, authorize(['instructor', 'admin']), async (req, res) => {
  try {
    const { title, description, modules } = req.body;
    
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Ensure only the instructor who created the course or an admin can update it
    if (req.user.role === 'instructor' && 
        course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }
    
    // Update course
    course.title = title || course.title;
    course.description = description || course.description;
    course.modules = modules || course.modules;
    
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/courses/:id/enroll', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if student is already enrolled
    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    // Add student to course
    course.students.push(req.user._id);
    await course.save();
    
    // Add course to user's enrolled courses
    req.user.enrolledCourses.push(course._id);
    await req.user.save();
    
    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Assignment Routes
app.post('/api/assignments', auth, authorize(['instructor', 'admin']), async (req, res) => {
  try {
    const { title, description, courseId, dueDate, totalPoints } = req.body;
    
    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Verify instructor is teaching this course
    if (req.user.role === 'instructor' && 
        course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add assignments to this course' });
    }
    
    const assignment = new Assignment({
      title,
      description,
      course: courseId,
      dueDate,
      totalPoints
    });
    
    await assignment.save();
    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/courses/:id/assignments', auth, async (req, res) => {
  try {
    const courseId = req.params.id;
    
    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    // Check if user has access to the course
    if (req.user.role === 'student' && 
        !course.students.some(student => student.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    const assignments = await Assignment.find({ course: courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/assignments/:id/submit', auth, authorize(['student']), async (req, res) => {
  try {
    const { content } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Check if student is enrolled in the course
    const course = await Course.findById(assignment.course);
    if (!course.students.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }
    
    // Check if submission is past due date
    const now = new Date();
    if (now > assignment.dueDate) {
      return res.status(400).json({ message: 'Submission past due date' });
    }
    
    // Check if student has already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user._id.toString()
    );
    
    if (existingSubmission) {
      // Update existing submission
      existingSubmission.content = content;
      existingSubmission.submissionDate = now;
    } else {
      // Add new submission
      assignment.submissions.push({
        student: req.user._id,
        content,
        submissionDate: now
      });
    }
    
    await assignment.save();
    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/assignments/:id/grade', auth, authorize(['instructor', 'admin']), async (req, res) => {
  try {
    const { studentId, grade, feedback } = req.body;
    
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    
    // Verify instructor is teaching this course
    const course = await Course.findById(assignment.course);
    if (req.user.role === 'instructor' && 
        course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to grade assignments for this course' });
    }
    
    // Find student's submission
    const submission = assignment.submissions.find(
      sub => sub.student.toString() === studentId
    );
    
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    // Update grade and feedback
    submission.grade = grade;
    submission.feedback = feedback;
    
    await assignment.save();
    res.json({ message: 'Assignment graded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Dashboard routes
app.get('/api/dashboard', auth, async (req, res) => {
  try {
    let data = {};
    
    if (req.user.role === 'student') {
      // Get student's enrolled courses
      const courses = await Course.find({ students: req.user._id })
        .select('title description')
        .populate('instructor', 'name');
      
      // Get upcoming assignments
      const assignments = await Assignment.find({
        course: { $in: courses.map(course => course._id) },
        dueDate: { $gte: new Date() }
      }).sort({ dueDate: 1 }).limit(5);
      
      data = {
        enrolledCourses: courses,
        upcomingAssignments: assignments
      };
    } else if (req.user.role === 'instructor') {
      // Get instructor's courses
      const courses = await Course.find({ instructor: req.user._id })
        .select('title description students');
      
      // Count total students
      const totalStudents = new Set(
        courses.flatMap(course => course.students.map(student => student.toString()))
      ).size;
      
      // Get recent submissions
      const recentAssignments = await Assignment.find({
        course: { $in: courses.map(course => course._id) }
      })
      .sort({ 'submissions.submissionDate': -1 })
      .limit(5);
      
      data = {
        courses,
        totalStudents,
        totalCourses: courses.length,
        recentAssignments
      };
    } else if (req.user.role === 'admin') {
      // Get all system stats
      const totalUsers = await User.countDocuments();
      const totalCourses = await Course.countDocuments();
      const totalAssignments = await Assignment.countDocuments();
      
      const usersByRole = await User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } }
      ]);
      
      data = {
        totalUsers,
        totalCourses,
        totalAssignments,
        usersByRole
      };
    }
    
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
