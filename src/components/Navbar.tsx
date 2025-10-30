import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BookCopy, Home } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <BookOpen className="h-8 w-8 mr-2" />
          <h1 className="text-2xl font-bold">Library Management System</h1>
        </div>
        
        <div className="flex flex-wrap justify-center space-x-1 md:space-x-4">
          <Link 
            to="/" 
            className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/')}`}
          >
            <Home className="h-5 w-5 mr-1" />
            <span>Home</span>
          </Link>
          
          <Link 
            to="/books" 
            className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/books')}`}
          >
            <BookCopy className="h-5 w-5 mr-1" />
            <span>Books</span>
          </Link>
          
          <Link 
            to="/users" 
            className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/users')}`}
          >
            <Users className="h-5 w-5 mr-1" />
            <span>Users</span>
          </Link>
          
          <Link 
            to="/borrow" 
            className={`flex items-center px-3 py-2 rounded hover:bg-blue-700 transition-colors ${isActive('/borrow')}`}
          >
            <BookOpen className="h-5 w-5 mr-1" />
            <span>Borrowing</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;