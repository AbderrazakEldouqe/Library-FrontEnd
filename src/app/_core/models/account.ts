import {Role} from './role';

export interface Account {
  id?: string;
  name: string;
  cin: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  approved: boolean;
  disabled: boolean;
}
