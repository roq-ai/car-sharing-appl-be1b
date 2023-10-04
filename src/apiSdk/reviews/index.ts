import queryString from 'query-string';
import { ReviewInterface, ReviewGetQueryInterface } from 'interfaces/review';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReviews = async (query?: ReviewGetQueryInterface): Promise<PaginatedInterface<ReviewInterface>> => {
  return fetcher('/api/reviews', {}, query);
};

export const createReview = async (review: ReviewInterface) => {
  return fetcher('/api/reviews', { method: 'POST', body: JSON.stringify(review) });
};

export const updateReviewById = async (id: string, review: ReviewInterface) => {
  return fetcher(`/api/reviews/${id}`, { method: 'PUT', body: JSON.stringify(review) });
};

export const getReviewById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/reviews/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteReviewById = async (id: string) => {
  return fetcher(`/api/reviews/${id}`, { method: 'DELETE' });
};
