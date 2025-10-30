import React from 'react';
import { User } from '../types';
import { Link } from 'react-router-dom';
import { UserCircle, Calendar } from 'lucide-react';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-105">
      <div className="flex items-center mb-3">
        <UserCircle className="h-10 w-10 text-blue-600 mr-3" />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>
      
      <div className="mb-3">
        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
        }`}>
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <Calendar className="h-4 w-4 mr-1" />
        <span>Member since: {user.memberSince}</span>
      </div>
      
      <Link 
        to={`/users/${user.id}`}
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
};

export default UserCard;