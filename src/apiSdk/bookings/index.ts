import queryString from 'query-string';
import { BookingInterface, BookingGetQueryInterface } from 'interfaces/booking';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBookings = async (query?: BookingGetQueryInterface): Promise<PaginatedInterface<BookingInterface>> => {
  return fetcher('/api/bookings', {}, query);
};

export const createBooking = async (booking: BookingInterface) => {
  return fetcher('/api/bookings', { method: 'POST', body: JSON.stringify(booking) });
};

export const updateBookingById = async (id: string, booking: BookingInterface) => {
  return fetcher(`/api/bookings/${id}`, { method: 'PUT', body: JSON.stringify(booking) });
};

export const getBookingById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/bookings/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteBookingById = async (id: string) => {
  return fetcher(`/api/bookings/${id}`, { method: 'DELETE' });
};
