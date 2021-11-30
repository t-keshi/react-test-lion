import { TextField, TextFieldProps } from '@mui/material';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type Props<TFieldValues extends FieldValues> = Partial<UseControllerProps<TFieldValues>> &
  Omit<TextFieldProps, 'name'>;

export const FormTextField = <TFieldValues extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...textFieldProps
}: Props<TFieldValues>): React.ReactElement => {
  if (name !== undefined && control !== undefined) {
    return (
      <UncontrolledFromTextField
        id={name}
        name={name}
        rules={rules}
        shouldUnregister={shouldUnregister}
        defaultValue={defaultValue}
        control={control}
        {...textFieldProps}
      />
    );
  }

  return <TextField id={name} {...textFieldProps} />;
};

type UncontrolledFromTextFieldProps<TFieldValues extends FieldValues> =
  UseControllerProps<TFieldValues> & Omit<TextFieldProps, 'name'>;

const UncontrolledFromTextField = <TFieldValues extends FieldValues>({
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...textFieldProps
}: UncontrolledFromTextFieldProps<TFieldValues>): React.ReactElement => {
  const {
    field,
    formState: { errors },
  } = useController<TFieldValues>({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  const errorName = errors[name];
  const errorMessage =
    errorName && 'message' in errorName && typeof errorName.message === 'string'
      ? errorName.message
      : null;

  return (
    <TextField
      {...field}
      {...textFieldProps}
      error={errorName !== undefined}
      helperText={errorMessage}
    />
  );
};
