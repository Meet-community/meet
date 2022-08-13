import React, { FC, useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useRouter } from 'next/router';
import {
  useForgotUserPasswordMutation,
} from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';
import { PasswordInput } from '../UI/Inputs/PasswordInput/PasswordInput';
import {
  AmplitudeAnalyticsEvents,
  useAmplitudeAnalytics,
} from '../../services/AmplitudeAnalystics/amplitudeAnalyticsEvents';

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

export const ForgotPassword: FC = React.memo(() => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const router = useRouter();
  const { logEvent } = useAmplitudeAnalytics();

  useEffect(() => {
    logEvent(AmplitudeAnalyticsEvents.ForgotPasswordPageOpened);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [forgotPassword, { loading }] = useForgotUserPasswordMutation({
    onError: (e) => {
      if (e.message === 'email_not_confirmed') {
        setEmailError('Email not confirmed');
      } else {
        setEmailError('Wrong email');
      }
    },
    onCompleted: () => {
      logEvent(AmplitudeAnalyticsEvents.ForgotPasswordRequest);
      router.push(`${ROUTES.forgotPassword.index}/${ROUTES.forgotPassword.success}`);
    },
  });

  const onSubmit = () => {
    if (!email || !password || !repeatPassword) {
      return;
    }

    if (password !== repeatPassword) {
      setPasswordError('Password mismatch');

      return;
    }

    forgotPassword({
      variables: {
        args: {
          email, temporaryPassword: password,
        },
      },
    });
  };

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
              <LockResetIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Restore password
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                onSubmit();
              }}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type={email}
                value={email}
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => {
                  setEmailError(null);
                  setEmail(e.target.value);
                }}
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
                value: password,
                onChange: (e) => {
                  setPasswordError(null);
                  setPassword(e.target.value);
                },
                autoComplete: 'current-password',
              }}
              />

              <PasswordInput inputProps={{
                margin: 'normal',
                required: true,
                fullWidth: true,
                name: 'repeatPassword',
                label: 'Repeat password',
                id: 'repeatPassword',
                helperText: passwordError,
                error: !!passwordError,
                value: repeatPassword,
                onChange: (e) => {
                  setPasswordError(null);
                  setRepeatPassword(e.target.value);
                },
                autoComplete: 'current-password',
              }}
              />

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                loading={loading}
                disabled={!password || !email || !repeatPassword}
                sx={{ mt: 3, mb: 2 }}
              >
                Send confirm email
              </LoadingButton>

              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});
