import { Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { FC, memo, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import TextField from '@mui/material/TextField';
import styles from './PasswordInputWrapper.module.scss';

interface Props {
  textProps: TextFieldProps;
}

export const PasswordInputWrapper: FC<Props> = memo((props) => {
  const { textProps } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.wrapper}>
      <TextField
        type={!showPassword ? 'password' : 'text'}
        {...textProps}
      />

      <Button
        onClick={() => setShowPassword((prev) => !prev)}
        className={styles.button}
      >
        {
          !showPassword
            ? <Visibility />
            : <VisibilityOff />
        }
      </Button>
    </div>
  );
});
