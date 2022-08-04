import React, {
  memo, useCallback, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { useUpdateUserMutation } from '../../../controllers/graphql/generated';
import { useAuthUser } from '../../../controllers/entities/user/useAuthUserHook';
import styles from '../Profile.module.scss';
import { useSaveShortcut } from '../../../hooks/useSaveShortcut';

export const UpdateUserNames = memo(() => {
  const authUser = useAuthUser();

  const [firstName, setFirstName] = useState<string | undefined>(authUser?.firstName);
  const [lastName, setLastName] = useState<string | undefined>(authUser?.lastName);
  const [isFirstNameError, setIsFirstNameError] = useState<boolean>(false);
  const [isLastNameError, setIsLastNameError] = useState<boolean>(false);

  const [updateUser, { loading }] = useUpdateUserMutation();

  const submitHandler = useCallback(() => {
    setIsFirstNameError(!firstName);
    setIsLastNameError(!lastName);

    if (!firstName || !lastName) {
      return;
    }

    updateUser({ variables: { args: { firstName, lastName } } });
  }, [firstName, lastName, updateUser]);

  const shortCutSubmit = useCallback(() => {
    const isFirstNameChanged = authUser?.firstName !== firstName;
    const isLastNameChanged = authUser?.lastName !== lastName;

    if (isFirstNameChanged || isLastNameChanged) {
      submitHandler();
    }
  }, [authUser?.firstName, authUser?.lastName, firstName, lastName, submitHandler]);

  useSaveShortcut(shortCutSubmit);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      submitHandler();
    }}
    >
      <div className={styles.inputs}>
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          label="First name"
          name="firstName"
          helperText={isFirstNameError && 'Required field'}
          error={isFirstNameError}
        />

        <TextField
          margin="normal"
          fullWidth
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          label="Last name"
          name="lastName"
          helperText={isLastNameError && 'Required field'}
          error={isLastNameError}
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
