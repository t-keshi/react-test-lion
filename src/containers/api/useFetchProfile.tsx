import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query';
import { kyAuth } from './kyInstance';

type Data = { name: string; profile: string };
type UseFetchProfile = (
  options?: UseQueryOptions<Data, Error, Data, [string]>,
) => UseQueryResult<Data, Error>;

export const useFetchProfile: UseFetchProfile = (options) => {
  const queryFn = async () => {
    const res: Data = await kyAuth.get('profile').json();

    return res;
  };

  return useQuery(['profile'], queryFn, {
    ...options,
  });
};
