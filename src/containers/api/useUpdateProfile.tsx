import { UseMutationOptions, UseMutationResult, useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from '../contexts/snackbar';
import { kyAuth } from './kyInstance';

type Data = unknown;
type Variables = { name: string; profile: string };
type UseUpdateProfile = (
  options?: UseMutationOptions<Data, Error, Variables>,
) => UseMutationResult<Data, Error, Variables>;

export const useUpdateProfile: UseUpdateProfile = (options) => {
  const queryClient = useQueryClient();
  const [_, snackbarDispatch] = useSnackbar();
  const mutationFn = async ({ name, profile }: Variables) => {
    const res: Data = await kyAuth
      .post('profile', {
        json: {
          name,
          profile,
        },
      })
      .json();

    return res;
  };

  return useMutation(mutationFn, {
    onSuccess: () => {
      snackbarDispatch({ type: 'open', payload: { message: '変更しました' } });
      void queryClient.invalidateQueries(['profile']);
    },
    ...options,
  });
};
