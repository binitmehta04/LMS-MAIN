import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import BorrowingTable from '../components/BorrowingTable';
import { Link } from 'react-router-dom';
import { PlusCircle, BookOpen, Filter } from 'lucide-react';

const BorrowingPage: React.FC = () => {
  const { borrowRecords } = useLibrary();
  const [filter, setFilter] = useState('all');
  
  const filteredRecords = borrowRecords.filter(record => {
    if (filter === 'all') return true;
    return record.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BookOpen className="h-8 w-8 mr-2 text-blue-600" />
            Borrowing Records
          </h1>
          <p className="text-gray-600 mt-1">Track and manage book borrowing</p>
        </div>
        
        <Link 
          to="/borrow/new"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          New Borrowing
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">Filter Records</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            All Records
          </button>
          
          <button
            onClick={() => setFilter('borrowed')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'borrowed'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Currently Borrowed
          </button>
          
          <button
            onClick={() => setFilter('overdue')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'overdue'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Overdue
          </button>
          
          <button
            onClick={() => setFilter('returned')}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              filter === 'returned'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Returned
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {filter === 'all' ? 'All Borrowing Records' : 
           filter === 'borrowed' ? 'Currently Borrowed Books' :
           filter === 'overdue' ? 'Overdue Books' : 'Returned Books'}
        </h2>
        
        <BorrowingTable records={filteredRecords} />
      </div>
    </div>
  );
};

export default BorrowingPage;