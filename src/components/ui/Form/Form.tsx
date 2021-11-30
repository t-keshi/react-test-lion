import { Box, BoxProps } from '@mui/material';
import { Children, createElement } from 'react';
import { Control, FieldValues } from 'react-hook-form';

interface Props<TFieldValues extends FieldValues> {
  children: React.ReactElement<{ name: keyof TFieldValues }>[];
  // eslint-disable-next-line @typescript-eslint/ban-types
  control: Control<TFieldValues, object>;
  onSubmit?: () => void;
}

export const Form = <TFieldValues extends FieldValues>({
  children,
  control,
  onSubmit,
  ...boxProps
}: Props<TFieldValues> & BoxProps): React.ReactElement => (
  <Box component="form" noValidate onSubmit={onSubmit} {...boxProps}>
    {Children.map<React.ReactNode, React.ReactElement<{ name: keyof TFieldValues; type?: string }>>(
      children,
      (child) =>
        child.props.name && child.props.type !== 'submit'
          ? createElement(child.type, {
              ...{
                ...child.props,
                control,
                key: child.props.name,
              },
            })
          : child,
    )}
  </Box>
);
