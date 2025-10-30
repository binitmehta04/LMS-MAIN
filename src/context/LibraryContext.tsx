import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, User, BorrowRecord } from '../types';
import { books as initialBooks } from '../data/books';
import { users as initialUsers } from '../data/users';
import { borrowRecords as initialBorrowRecords } from '../data/borrowRecords';
import { addDays, format, parseISO, isAfter } from 'date-fns';

interface LibraryContextType {
  books: Book[];
  users: User[];
  borrowRecords: BorrowRecord[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  deleteBook: (id: string) => void;
  addUser: (user: Omit<User, 'id' | 'memberSince'>) => void;
  borrowBook: (bookId: string, userId: string) => void;
  returnBook: (recordId: string) => void;
  getBookById: (id: string) => Book | undefined;
  getUserById: (id: string) => User | undefined;
  getBorrowRecordById: (id: string) => BorrowRecord | undefined;
  getBorrowRecordsByUser: (userId: string) => BorrowRecord[];
  getBorrowRecordsByBook: (bookId: string) => BorrowRecord[];
  searchBooks: (query: string) => Book[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

interface LibraryProviderProps {
  children: ReactNode;
}

export const LibraryProvider: React.FC<LibraryProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(initialBorrowRecords);

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...book,
      id: (books.length + 1).toString(),
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const addUser = (user: Omit<User, 'id' | 'memberSince'>) => {
    const newUser: User = {
      ...user,
      id: (users.length + 1).toString(),
      memberSince: format(new Date(), 'yyyy-MM-dd')
    };
    setUsers([...users, newUser]);
  };

  const borrowBook = (bookId: string, userId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || !book.available) return;

    const today = new Date();
    const dueDate = addDays(today, 14); // 2 weeks loan period

    const newBorrowRecord: BorrowRecord = {
      id: (borrowRecords.length + 1).toString(),
      bookId,
      userId,
      borrowDate: format(today, 'yyyy-MM-dd'),
      dueDate: format(dueDate, 'yyyy-MM-dd'),
      returnDate: null,
      status: 'borrowed'
    };

    setBorrowRecords([...borrowRecords, newBorrowRecord]);
    
    // Update book availability
    updateBook({ ...book, available: false });
  };

  const returnBook = (recordId: string) => {
    const record = borrowRecords.find(r => r.id === recordId);
    if (!record || record.status === 'returned') return;

    const today = format(new Date(), 'yyyy-MM-dd');
    const updatedRecord: BorrowRecord = {
      ...record,
      returnDate: today,
      status: 'returned'
    };

    setBorrowRecords(borrowRecords.map(r => r.id === recordId ? updatedRecord : r));

    // Update book availability
    const book = books.find(b => b.id === record.bookId);
    if (book) {
      updateBook({ ...book, available: true });
    }
  };

  const getBookById = (id: string) => books.find(book => book.id === id);
  
  const getUserById = (id: string) => users.find(user => user.id === id);
  
  const getBorrowRecordById = (id: string) => borrowRecords.find(record => record.id === id);
  
  const getBorrowRecordsByUser = (userId: string) => 
    borrowRecords.filter(record => record.userId === userId);
  
  const getBorrowRecordsByBook = (bookId: string) => 
    borrowRecords.filter(record => record.bookId === bookId);

  const searchBooks = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) || 
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.category.toLowerCase().includes(lowercaseQuery) ||
      book.isbn.includes(query)
    );
  };

  // Update overdue status
  React.useEffect(() => {
    const today = new Date();
    const updatedRecords = borrowRecords.map(record => {
      if (record.status === 'borrowed' && record.returnDate === null) {
        const dueDate = parseISO(record.dueDate);
        if (isAfter(today, dueDate)) {
          return { ...record, status: 'overdue' };
        }
      }
      return record;
    });
    
    setBorrowRecords(updatedRecords);
  }, []);

  const value = {
    books,
    users,
    borrowRecords,
    addBook,
    updateBook,
    deleteBook,
    addUser,
    borrowBook,
    returnBook,
    getBookById,
    getUserById,
    getBorrowRecordById,
    getBorrowRecordsByUser,
    getBorrowRecordsByBook,
    searchBooks
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
};