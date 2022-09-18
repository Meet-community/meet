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
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import cn from 'classnames';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { ROUTES } from '../../../routes/routes';
import { useLogOut } from '../../hooks/useLogOut';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { ComeBackIcon } from '../UI/icons/ComeBackIcon';
import styles from './Header.module.scss';

export function Header() {
  const authUser = useAuthUser();

  const { logOutHandler } = useLogOut();
  const router = useRouter();
  const matches900 = useMediaQuery('(max-width:900px)');
  const matches600 = useMediaQuery('(min-width:600px)');

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
    <div>
      <div style={{ height: matches600 ? '64px' : '56px', backgroundColor: '#2C2C2C' }} />
      <AppBar className={cn(styles.navBar)} position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
        <Container sx={{ maxWidth: '100%!important' }}>
          <Toolbar
            disableGutters
            sx={{ justifyContent: 'space-between', maxWidth: '100%' }}
          >
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
                  sx={{ cursor: 'pointer' }}
                  variant='overline'
                  mr="12px"
                  onClick={() => setShowMenu(true)}
                >
                  {`${authUser.firstName} ${authUser.lastName}`}
                </Typography>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Кабінет">
                    <IconButton onClick={() => setShowMenu(true)} sx={{ p: 0 }}>
                      <Avatar
                        src={authUser?.avatar || '/static/images/avatar/1.jpg'}
                        alt={authUser.firstName}
                      />
                    </IconButton>
                  </Tooltip>
                </Box>

                {matches600 && (
                  <a
                    style={{ display: 'flex', alignItems: 'center' }}
                    href="https://savelife.in.ua/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ComeBackIcon className={styles.comeBackIcon} />
                  </a>
                )}
              </div>
            )}

            {!authUser && matches900 && (
              <Box sx={{
                flexGrow: 1,
                display: { xs: 'flex', md: 'none', justifyContent: 'end' },
              }}
              >
                <IconButton
                  size="large"
                  aria-label="Кабінет"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={() => setShowMenu(true)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            )}

            {!authUser && !matches900 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                  <Button
                    onClick={onSignUp}
                    color="inherit"
                    variant="outlined"
                    style={{ marginRight: 12 }}
                    size={matches900 ? 'small' : 'large'}
                  >
                    <Typography textAlign="center">Зареєструватися</Typography>
                  </Button>

                  <Button
                    onClick={onSignIn}
                    color="inherit"
                    variant="outlined"
                    size={matches900 ? 'small' : 'large'}
                    style={{ marginRight: 8 }}
                  >
                    <Typography textAlign="center" mr={1}>Увійти</Typography>
                    <LoginIcon />
                  </Button>
                </div>

                {matches600 && (
                  <a
                    style={{ display: 'flex', alignItems: 'center' }}
                    href="https://savelife.in.ua/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ComeBackIcon className={styles.comeBackIcon} />
                  </a>
                )}
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
                <ListItemButton onClick={() => router.push(`/${ROUTES.home}`)}>
                  <ListItemIcon>
                    <HomeRounded />
                  </ListItemIcon>
                  <ListItemText primary="Події" />
                </ListItemButton>
              </ListItem>

              <Divider />

              {authUser && (
                <>
                  <Link href={`/${ROUTES.profile}`}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Персональні дані" />
                      </ListItemButton>
                    </ListItem>
                  </Link>

                  <Link href={`/${ROUTES.events.index}/${ROUTES.events.create}`}>
                    <ListItem disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <FiberNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Створити подію" />
                      </ListItemButton>
                    </ListItem>
                  </Link>

                  <ListItem disablePadding>
                    <ListItemButton onClick={onLogOut}>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Вийти" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}

              {!authUser && (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={onSignIn}>
                      <ListItemIcon>
                        <LoginIcon />
                      </ListItemIcon>
                      <ListItemText primary="Увійти" />
                    </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                    <ListItemButton onClick={onSignUp}>
                      <ListItemIcon>
                        <LogoutIcon />
                      </ListItemIcon>
                      <ListItemText primary="Зареєструватися" />
                    </ListItemButton>
                  </ListItem>
                </>
              )}
            </List>
          </Box>
        </Drawer>
      </AppBar>
    </div>
  );
}
