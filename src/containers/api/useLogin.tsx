import { UseMutationOptions, UseMutationResult, useMutation } from 'react-query';
import { getUserIdFromCookie, setUserIdToCookie } from '../../helpers/misc/cookie';
import { kyBase } from './kyInstance';

type Data = unknown;
type UseLogin = (
  options?: UseMutationOptions<Data, Error, unknown>,
) => UseMutationResult<Data, Error>;

export const useLogin: UseLogin = (options) => {
  const mutationFn = async () => {
    const res: Data = await kyBase.post('login');
    if (getUserIdFromCookie() === undefined) {
      setUserIdToCookie();
    }

    return res;
  };

  return useMutation(mutationFn, {
    ...options,
  });
};
