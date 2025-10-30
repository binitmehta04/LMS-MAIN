import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BorrowingTable from '../components/BorrowingTable';
import { ArrowLeft, Edit, Trash2, BookOpen, Calendar, Hash } from 'lucide-react';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBookById, deleteBook, getBorrowRecordsByBook } = useLibrary();
  
  const book = getBookById(id || '');
  const borrowRecords = getBorrowRecordsByBook(id || '');
  
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(book.id);
      navigate('/books');
    }
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
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3 p-6">
            <img 
              src={book.coverImage} 
              alt={`${book.title} cover`} 
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
              
              <div className="flex space-x-2">
                <Link 
                  to={`/books/edit/${book.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded flex items-center text-sm"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Link>
                
                <button 
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded flex items-center text-sm"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  <strong>Category:</strong> {book.category}
                </span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  <strong>Published:</strong> {book.publishedYear}
                </span>
              </div>
              
              <div className="flex items-center">
                <Hash className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-gray-700">
                  <strong>ISBN:</strong> {book.isbn}
                </span>
              </div>
              
              <div className="flex items-center">
                <div className={`h-3 w-3 rounded-full mr-2 ${book.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">
                  <strong>Status:</strong> {book.available ? 'Available' : 'Borrowed'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-700">{book.description}</p>
            </div>
            
            {!book.available && (
              <Link 
                to="/borrow"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                View Borrowing Records
              </Link>
            )}
            
            {book.available && (
              <Link 
                to="/borrow/new"
                className="inline-block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
              >
                Borrow This Book
              </Link>
            )}
          </div>
        </div>
        
        {borrowRecords.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Borrowing History</h2>
            <BorrowingTable records={borrowRecords} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;