import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import UserCard from '../components/UserCard';
import { Link } from 'react-router-dom';
import { PlusCircle, Users } from 'lucide-react';

const UsersPage: React.FC = () => {
  const { users } = useLibrary();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Users className="h-8 w-8 mr-2 text-blue-600" />
            Library Users
          </h1>
          <p className="text-gray-600 mt-1">Manage library members and administrators</p>
        </div>
        
        <Link 
          to="/users/add"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Add User
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersPage;