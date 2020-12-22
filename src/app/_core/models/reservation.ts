import {Book} from './book';
import {Account} from './account';

export interface Reservation {
  id?: string;
  borrowing_date: string;
  receiving_date: string;
  return_date: string;
  canceled_borrowed_book: boolean;
  book: Book;
  user: Account;
}
