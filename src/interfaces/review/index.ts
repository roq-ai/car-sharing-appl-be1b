import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  rating: number;
  comment: string;
  booking_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  booking?: BookingInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  booking_id?: string;
  user_id?: string;
}
