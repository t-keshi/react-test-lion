import { Box, BoxProps } from '@mui/material';

export const FormWrapper: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box component="form" noValidate {...props}>
    {children}
  </Box>
);
