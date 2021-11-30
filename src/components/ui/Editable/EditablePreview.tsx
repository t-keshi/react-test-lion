import { styled } from '@mui/material/styles';

export const EditablePreview = styled('span')(({ theme }) => ({
  cursor: 'text',
  display: 'inline-block',
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
}));
