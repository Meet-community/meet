import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  useAuthUserQuery, useSignUpMutation
} from '../../controllers/graphql/generated';
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
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary"
                align="center" {...props}>
      {'Copyright © Meet '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export const SignUp: FC = React.memo(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [emailError, setEmailError] = useState<string | null>(null);

    const [signUp, {
      loading,
    }] = useSignUpMutation({
      onError: console.log,
      onCompleted: console.log,
      fetchPolicy: 'network-only',
    });

    const signUpHandler = () => {
      signUp({
        variables: {
          args: {
            email, firstName, lastName, password
          }
        }
      })
    }

    const router = useRouter();

    const errorHandler = useCallback((typeError: string): void => {
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
    }, []);

    const onSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (passwordError || emailError) {
        return;
      }

      console.log(password)

      if (!password) {
        setPasswordError('Enter password')
      }

      if (password.length < 4) {
        setPasswordError('Minimum password length is 4')

        return;
      }

      await signUpHandler();
    }, [])

    const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordError(null)
    }, []);

    const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailError(null)
    }, []);

    const authUser = useAuthUser();

    useEffect(() => {
      if (authUser) {
        router.push('/');
      }
    }, [authUser, router]);

  console.log({email, password, firstName, lastName})

    return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{height: '100vh'}}>
          <CssBaseline/>
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
              <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" noValidate onSubmit={onSubmit} sx={{mt: 1}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  type={email}
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
                  sx={{mt: 3, mb: 2}}
                >
                  Sign up
                </LoadingButton>
                <Grid container>
                  <Grid item xs>
                    <Typography variant="body2">
                      <Link href="#">
                        Forgot password?
                      </Link>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="body2">
                      <Link href="/signIn">
                        {"Already have an account? Sign in"}
                      </Link>
                    </Typography>
                  </Grid>
                </Grid>
                <Copyright sx={{mt: 5}}/>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
);