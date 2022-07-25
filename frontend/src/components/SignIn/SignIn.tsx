import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  AuthUserDocument, AuthUserQuery,
  useAuthUserQuery,
  useSignInMutation
} from '../../controllers/graphql/generated';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { Paper, Skeleton } from '@mui/material';
import { useApolloClient } from '@apollo/client';
import { LoadingButton } from '@mui/lab';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Meet '}
      {new Date().getFullYear()}
      {'.'}
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

  const authUser = useAuthUser();
  const [signIn, { loading } ] = useSignInMutation({
    onCompleted: async (data) => {
      client.writeQuery<AuthUserQuery>({
        query: AuthUserDocument,
        data: {
          authUser: data.signIn,
        },
      })

      //TODO: Add routes const (sergio)
      await router.push('/')
    },
    onError: res => errorHandler(res.message),
    fetchPolicy: 'no-cache',
  });

  const router = useRouter();

  const errorHandler = (typeError: string): void => {
    switch (typeError) {
      case 'invalid_email':
        setEmailError('Invalid Email');
        break;
      case 'email_not_confirmed':
        setEmailError('Email not confirmed');
        break;
      case 'invalid_password':
        setPasswordError('Invalid password')
        break;
      default:
        break;
      }
    };

  const signInHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError || emailError) {
      return;
    }

    await signIn({ variables: { args: { email, password } } });
  }

  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement> ) => {
    setPassword(e.target.value);
    setPasswordError(null)
  }, []);

  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement> ) => {
    setEmail(e.target.value);
    setEmailError(null)
  }, []);

  useEffect(() => {
    if (authUser) {
      router.push('/');
    }
  }, [authUser, router]);

    return  (
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
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
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
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
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
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
);
