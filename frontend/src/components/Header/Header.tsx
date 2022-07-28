import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { useRouter } from 'next/router';
import { HomeRounded } from '@mui/icons-material';
import NearMeIcon from '@mui/icons-material/NearMe';
import LoginIcon from '@mui/icons-material/Login';
import { Drawer, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import { ROUTES } from '../../../routes/routes';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import styles from './Header.module.scss';

export function Header() {
  const authUser = useAuthUser();

  const { logOutHandler } = useLogOut();
  const router = useRouter();
  const matches = useMediaQuery('(max-width:900px)');

  const [showMenu, setShowMenu] = useState(false);

  const onLogOut = useCallback(async () => {
    setShowMenu(false);
    await logOutHandler();
  }, [logOutHandler]);

  const onSignIn = useCallback(() => {
    setShowMenu(false);
    router.push(`/${ROUTES.signIn}`);
  }, [router]);

  const onSignUp = useCallback(() => {
    setShowMenu(false);
    router.push(`/${ROUTES.signUp.index}`);
  }, [router]);

  return (
    <AppBar position="static">
      <Container sx={{ maxWidth: '100%!important' }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', maxWidth: '100%' }}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
              justifyContent: 'start',
              gap: '12px',
              cursor: 'pointer',
            }}
            onClick={() => router.push(ROUTES.home)}
          >
            <NearMeIcon />

            Meet
          </Typography>

          {authUser && (
            <div className={styles.fullName}>
              <Typography
                variant='overline'
                mr="12px"
              >
                {`${authUser.firstName} ${authUser.lastName}`}
              </Typography>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={() => setShowMenu(true)} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/1.jpg" alt={authUser.firstName} />
                  </IconButton>
                </Tooltip>
              </Box>
            </div>
          )}

          {!authUser && matches && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', justifyContent: 'end' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setShowMenu(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
          )}

          {!authUser && !matches && (
            <div>
              <Button
                onClick={onSignUp}
                color="inherit"
                variant="outlined"
                style={{ marginRight: 12 }}
                size={matches ? 'small' : 'large'}
              >
                <Typography textAlign="center">Sign up</Typography>
              </Button>

              <Button
                onClick={onSignIn}
                color="inherit"
                variant="outlined"
                size={matches ? 'small' : 'large'}
                style={{ marginRight: 8 }}
              >
                <Typography textAlign="center" mr={1}>Sign in</Typography>
                <LoginIcon />
              </Button>
            </div>
          )}
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={showMenu}
        onClose={() => setShowMenu(false)}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => router.push(ROUTES.home)}>
                <ListItemIcon>
                  <HomeRounded />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </ListItem>

            <Divider />

            {authUser && (
              <ListItem disablePadding>
                <ListItemButton onClick={onLogOut}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </ListItem>
            )}

            {!authUser && (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={onSignIn}>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign in" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton onClick={onSignUp}>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sign up" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}
