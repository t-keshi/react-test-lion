import { useForm, UseFormReturn } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { yup, SchemaOf } from './yupCustom';

export interface LoginFormValues {
  email: string;
  password: string;
}

export const loginSchema: SchemaOf<LoginFormValues> = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*?[a-z])(?=.*?[A-Z])/)
    .required(),
});

// eslint-disable-next-line @typescript-eslint/ban-types
export const useLoginForm = (): UseFormReturn<LoginFormValues, object> =>
  useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    shouldUnregister: true,
  });
