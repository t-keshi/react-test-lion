import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Square = styled(Box)<BoxProps>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexGrow: 0,
  flexShrink: 0,
});
