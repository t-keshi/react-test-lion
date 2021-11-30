import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yup, SchemaOf } from './yupCustom';

export interface ProfileFormValues {
  name: string;
  profile: string;
}

export const profileSchema: SchemaOf<ProfileFormValues> = yup.object().shape({
  name: yup.string().max(20).required(),
  profile: yup.string().max(200).required(),
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const useProfileForm = (): UseFormReturn<ProfileFormValues, object> =>
  useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: { name: '', profile: '' },
    shouldUnregister: true,
  });
