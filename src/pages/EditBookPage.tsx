import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BookForm from '../components/BookForm';
import { ArrowLeft, Edit } from 'lucide-react';
import { Book } from '../types';

const EditBookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, updateBook } = useLibrary();
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">Book not found</p>
        <Link to="/books" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Books
        </Link>
      </div>
    );
  }

  const handleSubmit = (bookData: Omit<Book, 'id'>) => {
    updateBook({ ...bookData, id: book.id });
    navigate(`/books/${book.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to={`/books/${book.id}`}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Book Details
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-6">
          <Edit className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Edit Book: {book.title}</h1>
        </div>
        
        <BookForm 
          initialData={book}
          onSubmit={handleSubmit}
          buttonText="Update Book"
        />
      </div>
    </div>
  );
};

export default EditBookPage;