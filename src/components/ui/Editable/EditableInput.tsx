import { styled } from '@mui/material/styles';

export const EditableInput = styled('input')(({ theme }) => ({
  outline: 'transparent solid 2px',
  outlineOffset: '2px',
  fontSize: 'inherit',
  fontWeight: 'inherit',
  textAlign: 'inherit',
  background: 'transparent',
  borderRadius: theme.shape.borderRadius,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  transitionProperty:
    'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
  transitionDuration: '200ms',
  width: '100%',
}));
