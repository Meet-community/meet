import React, {
  FC, useCallback, useEffect, useState,
} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Paper } from '@mui/material';
import { useApolloClient } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import {
  AuthUserDocument, AuthUserQuery,
  useSignInMutation,
} from '../../controllers/graphql/generated';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { ROUTES } from '../../../routes/routes';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Meet '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const theme = createTheme();

export const SignIn: FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const client = useApolloClient();

  const errorHandler = (typeError: string): void => {
    switch (typeError) {
      case 'invalid_email':
        setEmailError('Invalid Email');
        break;
      case 'email_not_confirmed':
        setEmailError('Email not confirmed');
        break;
      case 'invalid_password':
        setPasswordError('Invalid password');
        break;
      default:
        break;
    }
  };

  const router = useRouter();
  const authUser = useAuthUser();

  const [signIn, { loading }] = useSignInMutation({
    onCompleted: async (data) => {
      client.writeQuery<AuthUserQuery>({
        query: AuthUserDocument,
        data: {
          authUser: data.signIn,
        },
      });

      await router.push(ROUTES.home);
    },
    onError: (res) => errorHandler(res.message),
    fetchPolicy: 'no-cache',
  });

  const signInHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError || emailError) {
      return;
    }

    await signIn({ variables: { args: { email, password } } });
  };

  const onChangePassword = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPassword(e.target.value);
    setPasswordError(null);
  }, []);

  const onChangeEmail = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEmail(e.target.value);
    setEmailError(null);
  }, []);

  useEffect(() => {
    if (authUser) {
      router.push(ROUTES.home);
    }
  }, [authUser, router]);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>

            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <Box component="form" noValidate onSubmit={signInHandler} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={email}
                error={!!emailError}
                helperText={emailError}
                onChange={onChangeEmail}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                helperText={passwordError}
                error={!!passwordError}
                value={password}
                onChange={onChangePassword}
                autoComplete="current-password"
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                sx={{ mt: 3, mb: 2 }}
                disabled={!password || !email}
              >
                Sign In
              </LoadingButton>

              <Grid container>
                <Grid item xs>
                  {/* <Link href="/signIn" variant="body2"> */}
                  {/*  Forgot password? */}
                  {/* </Link> */}
                </Grid>

                <Grid item>
                  <Typography variant="body2">
                    <Link href="/signUp">
                      {'Don\'t have an account? Sign Up'}
                    </Link>
                  </Typography>
                </Grid>
              </Grid>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});
