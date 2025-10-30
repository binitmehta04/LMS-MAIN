export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage: string;
  available: boolean;
  publishedYear: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member';
  memberSince: string;
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: 'borrowed' | 'returned' | 'overdue';
}