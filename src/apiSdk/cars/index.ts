import queryString from 'query-string';
import { CarInterface, CarGetQueryInterface } from 'interfaces/car';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCars = async (query?: CarGetQueryInterface): Promise<PaginatedInterface<CarInterface>> => {
  return fetcher('/api/cars', {}, query);
};

export const createCar = async (car: CarInterface) => {
  return fetcher('/api/cars', { method: 'POST', body: JSON.stringify(car) });
};

export const updateCarById = async (id: string, car: CarInterface) => {
  return fetcher(`/api/cars/${id}`, { method: 'PUT', body: JSON.stringify(car) });
};

export const getCarById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/cars/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteCarById = async (id: string) => {
  return fetcher(`/api/cars/${id}`, { method: 'DELETE' });
};
