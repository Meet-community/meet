import React, { memo, useState } from 'react';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import {
  useUpdateUserPasswordMutation,
} from '../../../controllers/graphql/generated';
import styles from '../Profile.module.scss';

export const UpdateUserPassword = memo(() => {
  const [newPassword, setNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState<string>();

  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [changePassword, { loading }] = useUpdateUserPasswordMutation({
    onError: (res) => setPasswordError(res.message),
  });

  const onSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError) {
      return;
    }

    if (!newPassword || !oldPassword) {
      setPasswordError('Enter password');

      return;
    }

    await changePassword({ variables: { args: { newPassword, oldPassword } } });
    setNewPassword('');
    setOldPassword('');
  };

  return (
    <>
      <Typography
        sx={{ fontSize: { md: 24 } }}
        variant="h6"
        component="p"
      >
        Password
      </Typography>
      <form onSubmit={onSubmitPassword}>
        <div className={styles.inputs}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            value={newPassword}
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => setNewPassword(e.target.value)}
            label="New Password"
            name="newPassword"
            autoComplete="current-password"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="oldPassword"
            value={oldPassword}
            error={!!passwordError}
            helperText={passwordError}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setPasswordError(null);
            }}
            label="Old password"
            name="oldPassword"
          />
        </div>

        <LoadingButton
          sx={{
            width: { xs: '100%', sm: 240 },
            marginLeft: { sm: 'auto' },
            display: 'block',
          }}
          type="submit"
          loading={loading}
          variant="contained"
          color="success"
        >
          Save
        </LoadingButton>
      </form>
    </>
  );
});
