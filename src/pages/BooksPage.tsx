import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import { Link } from 'react-router-dom';
import { PlusCircle, BookCopy } from 'lucide-react';

const BooksPage: React.FC = () => {
  const { books, searchBooks } = useLibrary();
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [activeCategory, setActiveCategory] = useState('All');

  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(searchBooks(query));
    }
    setActiveCategory('All');
  };

  const categories = ['All', ...Array.from(new Set(books.map(book => book.category)))];

  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    if (category === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.category === category));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BookCopy className="h-8 w-8 mr-2 text-blue-600" />
            Books Catalog
          </h1>
          <p className="text-gray-600 mt-1">Browse and manage the library's collection</p>
        </div>
        
        <div className="flex space-x-2">
          <SearchBar onSearch={handleSearch} />
          
          <Link 
            to="/books/add"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          >
            <PlusCircle className="h-5 w-5 mr-1" />
            Add Book
          </Link>
        </div>
      </div>
      
      <div className="mb-6 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;