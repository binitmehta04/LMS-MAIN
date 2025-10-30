import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import BorrowingTable from '../components/BorrowingTable';
import { ArrowLeft, Mail, Calendar, UserCircle } from 'lucide-react';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getUserById, getBorrowRecordsByUser } = useLibrary();
  
  const user = getUserById(id || '');
  const borrowRecords = getBorrowRecordsByUser(id || '');
  
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-xl text-gray-600">User not found</p>
        <Link to="/users" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Users
        </Link>
      </div>
    );
  }

  const activeRecords = borrowRecords.filter(record => record.status !== 'returned');
  const historyRecords = borrowRecords.filter(record => record.status === 'returned');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/users"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <UserCircle className="h-16 w-16 text-blue-600" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-1">{user.name}</h1>
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
              }`}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center text-gray-700 mb-4">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              <span>
                <strong>Member since:</strong> {user.memberSince}
              </span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
                {borrowRecords.length} Total Borrows
              </div>
              
              <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-2">
                {activeRecords.filter(r => r.status === 'borrowed').length} Active
              </div>
              
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {activeRecords.filter(r => r.status === 'overdue').length} Overdue
              </div>
            </div>
          </div>
        </div>
        
        {activeRecords.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Borrows</h2>
            <BorrowingTable records={activeRecords} />
          </div>
        )}
        
        {historyRecords.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Borrowing History</h2>
            <BorrowingTable records={historyRecords} showReturnButton={false} />
          </div>
        )}
        
        {borrowRecords.length === 0 && (
          <div className="p-6 border-t border-gray-200 text-center">
            <p className="text-gray-500 italic">This user has not borrowed any books yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetailPage;