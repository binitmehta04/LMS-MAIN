import React from 'react';
import { Book } from '../types';
import { Link } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`${book.title} cover`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {book.category}
          </span>
          <span className="text-xs text-gray-500">
            {book.publishedYear}
          </span>
        </div>
        
        <div className="flex items-center mb-3">
          {book.available ? (
            <span className="flex items-center text-green-600 text-sm">
              <CheckCircle className="h-4 w-4 mr-1" />
              Available
            </span>
          ) : (
            <span className="flex items-center text-red-600 text-sm">
              <XCircle className="h-4 w-4 mr-1" />
              Borrowed
            </span>
          )}
        </div>
        
        <Link 
          to={`/books/${book.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;