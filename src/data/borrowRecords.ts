import { BorrowRecord } from '../types';
import { addDays, format } from 'date-fns';

const today = new Date();
const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

export const borrowRecords: BorrowRecord[] = [
  {
    id: '1',
    bookId: '3',
    userId: '2',
    borrowDate: formatDate(addDays(today, -10)),
    dueDate: formatDate(addDays(today, 4)),
    returnDate: null,
    status: 'borrowed'
  },
  {
    id: '2',
    bookId: '1',
    userId: '3',
    borrowDate: formatDate(addDays(today, -15)),
    dueDate: formatDate(addDays(today, -1)),
    returnDate: null,
    status: 'overdue'
  },
  {
    id: '3',
    bookId: '4',
    userId: '2',
    borrowDate: formatDate(addDays(today, -20)),
    dueDate: formatDate(addDays(today, -6)),
    returnDate: formatDate(addDays(today, -7)),
    status: 'returned'
  }
];