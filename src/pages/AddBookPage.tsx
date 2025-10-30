import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BookForm from '../components/BookForm';
import { ArrowLeft, BookPlus } from 'lucide-react';
import { Book } from '../types';

const AddBookPage: React.FC = () => {
  const navigate = useNavigate();
  const { addBook } = useLibrary();
  
  const handleSubmit = (bookData: Omit<Book, 'id'>) => {
    addBook(bookData);
    navigate('/books');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/books"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Books
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <BookPlus className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Add New Book</h1>
        </div>
        
        <BookForm 
          onSubmit={handleSubmit}
          buttonText="Add Book"
        />
      </div>
    </div>
  );
};

export default AddBookPage;