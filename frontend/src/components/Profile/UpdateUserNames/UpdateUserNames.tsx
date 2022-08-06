import React, {
  memo, useCallback, useMemo, useState,
} from 'react';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import { Tooltip } from '@mui/material';
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

  const isFieldsChange = useMemo(() => {
    const isFirstNameChanged = authUser?.firstName !== firstName;
    const isLastNameChanged = authUser?.lastName !== lastName;

    return isFirstNameChanged || isLastNameChanged;
  }, [authUser?.firstName, authUser?.lastName, firstName, lastName]);

  const submitHandler = useCallback(() => {
    setIsFirstNameError(!firstName);
    setIsLastNameError(!lastName);

    if (!firstName || !lastName || !isFieldsChange) {
      return;
    }

    updateUser({ variables: { args: { firstName, lastName } } });
  }, [firstName, isFieldsChange, lastName, updateUser]);

  const shortcutSubmit = useCallback(() => {
    if (isFieldsChange) {
      submitHandler();
    }
  }, [isFieldsChange, submitHandler]);

  useSaveShortcut(shortcutSubmit);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      submitHandler();
    }}
    >
      <div className={styles.inputs}>
        <TextField
          required
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
          required
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
  );
});
