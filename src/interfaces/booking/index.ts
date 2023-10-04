import { IssueInterface } from 'interfaces/issue';
import { ReviewInterface } from 'interfaces/review';
import { CarInterface } from 'interfaces/car';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_time: any;
  end_time: any;
  pickup_location: string;
  dropoff_location: string;
  car_id: string;
  user_id: string;
  created_at?: any;
  updated_at?: any;
  issue?: IssueInterface[];
  review?: ReviewInterface[];
  car?: CarInterface;
  user?: UserInterface;
  _count?: {
    issue?: number;
    review?: number;
  };
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  pickup_location?: string;
  dropoff_location?: string;
  car_id?: string;
  user_id?: string;
}
