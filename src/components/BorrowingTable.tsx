import React from 'react';
import { BorrowRecord, Book, User } from '../types';
import { useLibrary } from '../context/LibraryContext';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface BorrowingTableProps {
  records: BorrowRecord[];
  showReturnButton?: boolean;
}

const BorrowingTable: React.FC<BorrowingTableProps> = ({ records, showReturnButton = true }) => {
  const { getBookById, getUserById, returnBook } = useLibrary();

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'borrowed':
        return 'bg-blue-100 text-blue-800';
      case 'returned':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (records.length === 0) {
    return <p className="text-gray-500 italic">No borrowing records found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">Book</th>
            <th className="py-3 px-4 text-left">User</th>
            <th className="py-3 px-4 text-left">Borrow Date</th>
            <th className="py-3 px-4 text-left">Due Date</th>
            <th className="py-3 px-4 text-left">Status</th>
            {showReturnButton && <th className="py-3 px-4 text-left">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => {
            const book = getBookById(record.bookId) as Book;
            const user = getUserById(record.userId) as User;
            
            return (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <div className="h-10 w-8 flex-shrink-0 mr-2 bg-gray-200 rounded overflow-hidden">
                      {book && (
                        <img 
                          src={book.coverImage} 
                          alt={book.title} 
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="ml-1">
                      <p className="font-medium">{book?.title || 'Unknown Book'}</p>
                      <p className="text-xs text-gray-500">{book?.author || ''}</p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  {user?.name || 'Unknown User'}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    {record.borrowDate}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    {record.dueDate}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(record.status)}`}>
                    {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                  </span>
                </td>
                {showReturnButton && (
                  <td className="py-3 px-4">
                    {record.status !== 'returned' ? (
                      <button
                        onClick={() => returnBook(record.id)}
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded text-sm flex items-center"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Return
                      </button>
                    ) : (
                      <span className="text-gray-400 text-sm">Returned</span>
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowingTable;