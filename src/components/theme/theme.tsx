import { createTheme } from '@mui/material/styles';
import { colorTheme } from './colorTheme';
import { typographyTheme } from './typographyTheme';

export const theme = createTheme({
  ...colorTheme,
  ...typographyTheme,
});
