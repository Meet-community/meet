import React, { memo, useCallback, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { Tooltip } from '@mui/material';
import {
  useUpdateUserPasswordMutation,
} from '../../../controllers/graphql/generated';
import styles from '../Profile.module.scss';
import { PasswordInput } from '../../UI/Inputs/PasswordInput/PasswordInput';
import { useSaveShortcut } from '../../../hooks/useSaveShortcut';

export const UpdateUserPassword = memo(() => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState<string>();

  const [currentPasswordError, setCurrentPasswordError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [repeatPasswordError, setRepeatPasswordError] = useState<string | null>(null);

  const [changePassword, { loading }] = useUpdateUserPasswordMutation({
    onError: () => setCurrentPasswordError('Invalid error'),
  });

  const submitHandler = useCallback(async () => {
    if (currentPasswordError) {
      return;
    }

    if (!currentPassword || !newPasswordError || !repeatNewPassword) {
      setCurrentPasswordError(currentPassword ? null : 'Enter password');
      setNewPasswordError(newPassword ? null : 'Enter password');
      setRepeatPasswordError(repeatNewPassword ? null : 'Enter password');

      return;
    }

    if (newPassword !== repeatNewPassword) {
      setRepeatPasswordError('Password mismatch');

      return;
    }

    await changePassword({
      variables: {
        args: {
          newPassword,
          oldPassword: currentPassword,
        },
      },
    });
    setNewPassword('');
    setCurrentPassword('');
    setRepeatNewPassword('');
  }, [
    currentPasswordError,
    currentPassword,
    newPasswordError,
    repeatNewPassword,
    newPassword,
    changePassword,
  ]);

  const shortcutSubmit = useCallback(() => {
    if (currentPassword || newPassword || repeatNewPassword) {
      submitHandler();
    }
  }, [newPassword, currentPassword, repeatNewPassword, submitHandler]);

  useSaveShortcut(shortcutSubmit);

  return (
    <>
      <Typography
        sx={{ fontSize: { md: 24 } }}
        variant="h6"
        component="p"
      >
        Password
      </Typography>
      <form onSubmit={(e) => {
        e.preventDefault();
        submitHandler();
      }}
      >
        <PasswordInput inputProps={{
          required: true,
          margin: 'normal',
          fullWidth: true,
          id: 'oldPassword',
          value: currentPassword,
          error: !!currentPasswordError,
          helperText: currentPasswordError,
          onChange: (e) => {
            setCurrentPassword(e.target.value);
            setCurrentPasswordError(null);
          },
          label: 'Current password',
          name: 'oldPassword',
        }}
        />

        <div className={styles.inputs}>
          <PasswordInput inputProps={{
            required: true,
            margin: 'normal',
            fullWidth: true,
            id: 'newPassword',
            value: newPassword,
            onChange: (e) => {
              setNewPassword(e.target.value);
              setRepeatPasswordError(null);
              setNewPasswordError(null);
            },
            label: 'New Password',
            name: 'newPassword',
            error: !!newPasswordError,
            helperText: newPasswordError,
          }}
          />

          <PasswordInput inputProps={{
            required: true,
            margin: 'normal',
            fullWidth: true,
            id: 'repeatNewPassword',
            value: repeatNewPassword,
            error: !!repeatPasswordError,
            helperText: repeatPasswordError,
            onChange: (e) => {
              setRepeatNewPassword(e.target.value);
              setRepeatPasswordError(null);
              setNewPasswordError(null);
            },
            label: 'Repeat new password',
            name: 'repeatNewPassword',
          }}
          />
        </div>

        <Tooltip title="ctrl / cmd + s">
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
        </Tooltip>
      </form>
    </>
  );
});
