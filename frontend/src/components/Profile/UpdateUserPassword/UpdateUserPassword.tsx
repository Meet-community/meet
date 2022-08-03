import React, { memo, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { useUpdateUserPasswordMutation } from '../../../controllers/graphql/generated';
import { PasswordInputWrapper } from '../../../ui/PasswordInputWrapper/PasswordInputWrapper';
import styles from '../Profile.module.scss';

export const UpdateUserPassword = memo(() => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [oldPassword, setOldPassword] = useState<string>();

  const [
    currentPasswordError,
    setCurrentPasswordError,
  ] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);

  const [changePassword, { loading }] = useUpdateUserPasswordMutation({
    onError: (res) => setCurrentPasswordError(res.message),
  });

  const onSubmitPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentPasswordError) {
      return;
    }

    if (!newPassword || !oldPassword) {
      setCurrentPasswordError('Enter password');

      return;
    }

    if (newPassword !== repeatNewPassword) {
      setNewPasswordError('Password mismatch');

      return;
    }

    await changePassword({ variables: { args: { newPassword, oldPassword } } });
    setNewPassword('');
    setOldPassword('');
    setRepeatNewPassword('');
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
        <PasswordInputWrapper textProps={{
          margin: 'normal',
          required: true,
          fullWidth: true,
          id: 'oldPassword',
          value: oldPassword,
          error: !!currentPasswordError,
          helperText: currentPasswordError,
          onChange: (e) => {
            setOldPassword(e.target.value);
            setCurrentPasswordError(null);
          },
          label: 'Current password',
          name: 'oldPassword',
        }}
        />

        <div className={styles.inputs}>
          <PasswordInputWrapper textProps={{
            margin: 'normal',
            required: true,
            fullWidth: true,
            id: 'newPassword',
            value: newPassword,
            onChange: (e) => setNewPassword(e.target.value),
            label: 'New Password',
            name: 'newPassword',
          }}
          />

          <PasswordInputWrapper textProps={{
            margin: 'normal',
            required: true,
            fullWidth: true,
            id: 'repeatNewPassword',
            value: repeatNewPassword,
            error: !!newPasswordError,
            helperText: newPasswordError,
            onChange: (e) => {
              setRepeatNewPassword(e.target.value);
              setNewPasswordError(null);
            },
            label: 'Repeat new password',
            name: 'repeatNewPassword',
          }}
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
