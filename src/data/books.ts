import { Book } from '../types';

export const books: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '978-0061120084',
    category: 'Fiction',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    available: true,
    publishedYear: 1960
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    isbn: '978-0451524935',
    category: 'Science Fiction',
    description: 'A dystopian novel set in a totalitarian society ruled by the Party, which has total control over every aspect of people\'s lives.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    available: true,
    publishedYear: 1949
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '978-0743273565',
    category: 'Fiction',
    description: 'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    available: false,
    publishedYear: 1925
  },
  {
    id: '4',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '978-0141439518',
    category: 'Romance',
    description: 'The story follows the main character, Elizabeth Bennet, as she deals with issues of manners, upbringing, morality, education, and marriage.',
    coverImage: 'https://images.unsplash.com/photo-1603162617003-64224cfcb86f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    available: true,
    publishedYear: 1813
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    isbn: '978-0547928227',
    category: 'Fantasy',
    description: 'The adventure of Bilbo Baggins, a hobbit who embarks on an unexpected journey.',
    coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    available: true,
    publishedYear: 1937
  }
];