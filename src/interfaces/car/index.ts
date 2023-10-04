import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  owner_id: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  color?: string;
  owner_id?: string;
}
