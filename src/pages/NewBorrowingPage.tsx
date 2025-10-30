import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BorrowForm from '../components/BorrowForm';
import { ArrowLeft, BookOpen } from 'lucide-react';

const NewBorrowingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const handleBorrowComplete = () => {
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/borrow');
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/borrow"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Borrowing Records
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Borrow a Book</h1>
        </div>
        
        {isSuccess ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Success!</p>
            <p>The book has been borrowed successfully. Redirecting...</p>
          </div>
        ) : (
          <BorrowForm onBorrowComplete={handleBorrowComplete} />
        )}
      </div>
    </div>
  );
};

export default NewBorrowingPage;