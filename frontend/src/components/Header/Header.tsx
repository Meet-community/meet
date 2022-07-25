import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { HomeRounded } from '@mui/icons-material';
import Link from 'next/link';
import NearMeIcon from '@mui/icons-material/NearMe';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import { useMediaQuery } from '@mui/material';
import styles from './Header.module.scss';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { useLogOut } from '../../Hooks/useLogOut';

export function Header() {
  const authUser = useAuthUser();

  const { logOutHandler } = useLogOut();
  const router = useRouter();
  const matches = useMediaQuery('(max-width:600px)');

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogOut = useCallback(async () => {
    handleCloseUserMenu();
    await logOutHandler();
  }, [logOutHandler]);

  const onSignIn = useCallback(() => {
    handleCloseUserMenu();
    router.push('/signIn');
  }, [router]);

  const onSignUp = useCallback(() => {
    handleCloseUserMenu();
    router.push('/signUp');
  }, [router]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center',
            }}
          >
            <NearMeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

            Meet
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />

            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={() => router.push('/')}>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Meet
            <NearMeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          </Typography>

          <Link href="/">
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                sx={{ my: 2, color: 'white', display: 'flex' }}
                style={{ gap: 8 }}
              >
                <HomeRounded fontSize="small" />

                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    display: { xs: 'flex' },
                    fontFamily: 'Roboto',
                    fontSize: '16px',
                    lineHeight: '26px',
                    fontWeight: 500,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  Home
                </Typography>
              </Button>
            </Box>
          </Link>

          {authUser && (
            <>
              <Typography
                variant='overline'
                mr="12px"
                className={styles.fullName}
              >
                {`${authUser.firstName} ${authUser.lastName}`}
              </Typography>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="''" />
                  </IconButton>
                </Tooltip>

                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={onLogOut}>
                    <Typography
                      textAlign="center"
                      marginRight="4px"
                    >
                      Logout
                    </Typography>
                    <ExitToAppIcon />
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}

          {!authUser && (
            <>
              <Button
                onClick={onSignUp}
                color="inherit"
                variant="outlined"
                style={{ marginRight: 12 }}
                size={matches ? 'small' : 'large'}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'block',
                  },
                }}
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
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
