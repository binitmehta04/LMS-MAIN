import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import UserForm from '../components/UserForm';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { User } from '../types';

const AddUserPage: React.FC = () => {
  const navigate = useNavigate();
  const { addUser } = useLibrary();
  
  const handleSubmit = (userData: Omit<User, 'id' | 'memberSince'>) => {
    addUser(userData);
    navigate('/users');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/users"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <UserPlus className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Add New User</h1>
        </div>
        
        <UserForm 
          onSubmit={handleSubmit}
          buttonText="Add User"
        />
      </div>
    </div>
  );
};

export default AddUserPage;