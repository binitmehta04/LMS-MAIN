import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';

interface BorrowFormProps {
  onBorrowComplete: () => void;
}

const BorrowForm: React.FC<BorrowFormProps> = ({ onBorrowComplete }) => {
  const { books, users, borrowBook } = useLibrary();
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [error, setError] = useState('');

  const availableBooks = books.filter(book => book.available);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedBookId) {
      setError('Please select a book');
      return;
    }
    
    if (!selectedUserId) {
      setError('Please select a user');
      return;
    }
    
    borrowBook(selectedBookId, selectedUserId);
    onBorrowComplete();
    
    // Reset form
    setSelectedBookId('');
    setSelectedUserId('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="book" className="block text-sm font-medium text-gray-700">
          Select Book
        </label>
        <select
          id="book"
          value={selectedBookId}
          onChange={(e) => setSelectedBookId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">-- Select a book --</option>
          {availableBooks.map(book => (
            <option key={book.id} value={book.id}>
              {book.title} by {book.author}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="user" className="block text-sm font-medium text-gray-700">
          Select User
        </label>
        <select
          id="user"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">-- Select a user --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Borrow Book
        </button>
      </div>
    </form>
  );
};

export default BorrowForm;