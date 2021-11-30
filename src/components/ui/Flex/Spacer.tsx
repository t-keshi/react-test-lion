import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Flex = styled(Box)<BoxProps>({
  flex: '1 1 0%',
  placeSelf: 'stretch',
});
