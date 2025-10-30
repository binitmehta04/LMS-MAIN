import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import Navbar from './components/Navbar';

// Pages
import HomePage from './pages/HomePage';
import BooksPage from './pages/BooksPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import EditBookPage from './pages/EditBookPage';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import AddUserPage from './pages/AddUserPage';
import BorrowingPage from './pages/BorrowingPage';
import NewBorrowingPage from './pages/NewBorrowingPage';

function App() {
  return (
    <LibraryProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <main className="pb-12">
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              {/* Book Routes */}
              <Route path="/books" element={<BooksPage />} />
              <Route path="/books/:id" element={<BookDetailPage />} />
              <Route path="/books/add" element={<AddBookPage />} />
              <Route path="/books/edit/:id" element={<EditBookPage />} />
              
              {/* User Routes */}
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
              <Route path="/users/add" element={<AddUserPage />} />
              
              {/* Borrowing Routes */}
              <Route path="/borrow" element={<BorrowingPage />} />
              <Route path="/borrow/new" element={<NewBorrowingPage />} />
            </Routes>
          </main>
          <footer className="bg-white py-6 border-t">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>© 2025 Library Management System. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </Router>
    </LibraryProvider>
  );
}

export default App;