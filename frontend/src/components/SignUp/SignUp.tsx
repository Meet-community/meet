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
import { LoadingButton } from '@mui/lab';
import Link from 'next/link';
import { useSignUpMutation } from '../../controllers/graphql/generated';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { ROUTES } from '../../../routes/routes';
import { PasswordInput } from '../UI/Inputs/PasswordInput/PasswordInput';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © Meet '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

const theme = createTheme();

export const SignUp: FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();

  const errorHandler = (typeError: string): void => {
    switch (typeError) {
      case 'email_already_exist':
        setEmailError('Email already exist');
        break;
      default:
        break;
    }
  };

  const [signUp, { loading }] = useSignUpMutation({
    onError: (res) => errorHandler(res.message),
    onCompleted: () => router.push(`/${ROUTES.signUp.index}/${ROUTES.signUp.success}`),
    fetchPolicy: 'network-only',
  });

  const signUpHandler = useCallback(() => {
    signUp({
      variables: {
        args: {
          email, firstName, lastName, password,
        },
      },
    });
  }, [email, firstName, lastName, password, signUp]);

  const onSubmit = useCallback(async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (passwordError || emailError) {
      return;
    }

    if (!password) {
      setPasswordError('Enter password');

      return;
    }

    if (password.length < 4) {
      setPasswordError('Minimum password length is 4');

      return;
    }

    await signUpHandler();
  }, [passwordError, emailError, password, signUpHandler]);

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

  const onFirstName = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFirstName(e.target.value);
  }, []);

  const onLastName = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setLastName(e.target.value);
  }, []);

  const authUser = useAuthUser();

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
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    value={firstName}
                    onChange={onFirstName}
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
                    onChange={onLastName}
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

              <PasswordInput inputProps={{
                margin: 'normal',
                required: true,
                fullWidth: true,
                name: 'password',
                label: 'Password',
                id: 'password',
                helperText: passwordError,
                error: !!passwordError,
                value: password,
                onChange: onChangePassword,
                autoComplete: 'current-password',
              }}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={!password || !email || !firstName || !lastName}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </LoadingButton>

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2">
                    <Link href="/signIn">
                      Already have an account? Sign in
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
