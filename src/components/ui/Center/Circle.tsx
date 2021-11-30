import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Circle = styled(Box)<BoxProps>({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexGrow: 0,
  flexShrink: 0,
  borderRadius: '9999px',
});
