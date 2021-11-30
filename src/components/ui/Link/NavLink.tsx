import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';

type NavLinkProps = RouterNavLinkProps & MuiLinkProps;

const NavLinkBase = styled((props: NavLinkProps) => (
  <MuiLink component={RouterNavLink} {...props} />
))<NavLinkProps>({
  textDecoration: 'none',
});

export const NavLink: React.VFC<NavLinkProps> = (props) => {
  const theme = useTheme();

  return (
    <NavLinkBase
      style={({ isActive }) => ({
        color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
        textDecoration: isActive ? 'none' : 'underline',
      })}
      {...props}
    />
  );
};
