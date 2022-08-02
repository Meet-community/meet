import React, { memo, useCallback, useState } from 'react';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { useUpdateUserMutation } from '../../../controllers/graphql/generated';
import styles from '../Profile.module.scss';

export const UpdateUserNames = memo(() => {
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();

  const [updateUser, { loading }] = useUpdateUserMutation();

  const onSubmit = useCallback(async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!firstName && !lastName) {
      return;
    }

    await updateUser({ variables: { args: { firstName, lastName } } });
    setFirstName('');
    setLastName('');
  }, [firstName, lastName, updateUser]);

  return (
    <form onSubmit={onSubmit}>
      <div className={styles.inputs}>
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First name"
          name="firstName"
          autoFocus
        />

        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last name"
          name="lastName"
          autoFocus
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
  );
});
