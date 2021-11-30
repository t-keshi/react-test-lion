import { AppBar, Container, Toolbar, Typography, Button } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { NavLink } from '../ui/Link/NavLink';
import { Center } from '../ui/Center/Center';
import { removeUserIdFromCookie } from '../../helpers/misc/cookie';

export const Layout: React.VFC = () => {
  const allCookies = document.cookie;
  const newCookies = `${allCookies}, userId=abc-123;`;
  document.cookie = newCookies;

  return (
    <>
      <AppBar position="fixed" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            <Typography component="span" variant="h6" display="inline" sx={{ mr: 1 }}>
              🦁
            </Typography>
            React Test
          </Typography>
          <Center sx={{ gap: 2 }}>
            <NavLink to="/users">ユーザー一覧</NavLink>
            <NavLink to="/profile">プロフィール </NavLink>
            <Button
              variant="contained"
              disableElevation
              sx={{ ml: 2 }}
              onClick={removeUserIdFromCookie}
            >
              ログアウト
            </Button>
          </Center>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container component="main" maxWidth="md" sx={{ px: 2, py: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};
