import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { FetchUsersResponse } from '../../models';
import { kyAuth } from './kyInstance';

type Data = FetchUsersResponse;
type UseFetchUsers = (
  options?: UseQueryOptions<Data, Error, Data, [string, string]>,
) => UseQueryResult<Data, Error>;

export const useFetchUsers: UseFetchUsers = (options) => {
  const queryFn = async () => {
    const res: Data = await kyAuth.get('users').json();

    return res;
  };

  return useQuery(['users', 'list'], queryFn, {
    ...options,
  });
};
