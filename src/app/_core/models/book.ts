import {Language} from './language';
import {Categorie} from './categorie';

export interface Book {
  id?: string;
  isbn: string;
  title: string;
  edition: string;
  author: string;
  sotck_quantity: number;
  image: string;
  description: string;
  language: Language;
  categories: Categorie[];
  reserved?: boolean;
}
