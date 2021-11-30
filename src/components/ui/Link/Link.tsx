import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import React from 'react';

type Props = RouterLinkProps & MuiLinkProps;

export const Link: React.FC<Props> = ({ children, ...rest }) => (
  <MuiLink component={RouterLink} {...rest}>
    {children}
  </MuiLink>
);
