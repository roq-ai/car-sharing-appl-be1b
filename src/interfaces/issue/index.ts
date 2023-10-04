import { BookingInterface } from 'interfaces/booking';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface IssueInterface {
  id?: string;
  issue_type: string;
  description: string;
  status: string;
  reported_time: any;
  resolved_time?: any;
  booking_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;

  booking?: BookingInterface;
  user?: UserInterface;
  _count?: {};
}

export interface IssueGetQueryInterface extends GetQueryInterface {
  id?: string;
  issue_type?: string;
  description?: string;
  status?: string;
  booking_id?: string;
  user_id?: string;
}
