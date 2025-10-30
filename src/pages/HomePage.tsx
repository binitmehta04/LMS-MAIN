import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { Link } from 'react-router-dom';
import { BookOpen, Users, BookCopy, Clock } from 'lucide-react';

const HomePage: React.FC = () => {
  const { books, users, borrowRecords } = useLibrary();
  
  const availableBooks = books.filter(book => book.available);
  const borrowedBooks = books.filter(book => !book.available);
  const overdueRecords = borrowRecords.filter(record => record.status === 'overdue');

  const stats = [
    { 
      title: 'Total Books', 
      value: books.length, 
      icon: <BookCopy className="h-8 w-8 text-blue-600" />,
      color: 'bg-blue-100',
      link: '/books'
    },
    { 
      title: 'Available Books', 
      value: availableBooks.length, 
      icon: <BookOpen className="h-8 w-8 text-green-600" />,
      color: 'bg-green-100',
      link: '/books'
    },
    { 
      title: 'Borrowed Books', 
      value: borrowedBooks.length, 
      icon: <BookOpen className="h-8 w-8 text-yellow-600" />,
      color: 'bg-yellow-100',
      link: '/borrow'
    },
    { 
      title: 'Overdue Books', 
      value: overdueRecords.length, 
      icon: <Clock className="h-8 w-8 text-red-600" />,
      color: 'bg-red-100',
      link: '/borrow'
    },
    { 
      title: 'Total Users', 
      value: users.length, 
      icon: <Users className="h-8 w-8 text-purple-600" />,
      color: 'bg-purple-100',
      link: '/users'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Library Management System</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive system to manage books, users, and borrowing records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
        {stats.map((stat, index) => (
          <Link 
            key={index}
            to={stat.link}
            className={`${stat.color} rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
              {stat.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link 
              to="/books/add"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
            >
              Add New Book
            </Link>
            <Link 
              to="/users/add"
              className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
            >
              Add New User
            </Link>
            <Link 
              to="/borrow/new"
              className="block w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg text-center font-medium transition-colors"
            >
              Borrow a Book
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">System Overview</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Welcome to the Library Management System. This system allows you to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>Manage books (add, edit, delete)</li>
              <li>Manage users (add, view profiles)</li>
              <li>Track borrowing and returning of books</li>
              <li>Monitor overdue books</li>
              <li>Search for books by title, author, or category</li>
            </ul>
            <p className="text-gray-700">
              Use the navigation menu to access different sections of the system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;