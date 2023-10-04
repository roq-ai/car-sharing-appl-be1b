import queryString from 'query-string';
import { IssueInterface, IssueGetQueryInterface } from 'interfaces/issue';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getIssues = async (query?: IssueGetQueryInterface): Promise<PaginatedInterface<IssueInterface>> => {
  return fetcher('/api/issues', {}, query);
};

export const createIssue = async (issue: IssueInterface) => {
  return fetcher('/api/issues', { method: 'POST', body: JSON.stringify(issue) });
};

export const updateIssueById = async (id: string, issue: IssueInterface) => {
  return fetcher(`/api/issues/${id}`, { method: 'PUT', body: JSON.stringify(issue) });
};

export const getIssueById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/issues/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteIssueById = async (id: string) => {
  return fetcher(`/api/issues/${id}`, { method: 'DELETE' });
};
