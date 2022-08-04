import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React, { FC, memo, useState } from 'react';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';

interface Props {
  inputProps: TextFieldProps;
  className?: string;
}

export const PasswordInput: FC<Props> = memo((props) => {
  const { inputProps, className } = props;
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      className={className}
      type={!showPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...inputProps}
    />
  );
});
