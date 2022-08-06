import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { TextFieldVariant } from '../input.typdefs';

interface Props {
  minValue?: number | null;
  maxValue?: number | null;
  label: string;
  variant?: TextFieldVariant;
  value: number;
  setValue: (v: number) => void;
  required?: boolean;
}

export const NumberInput: FC<Props> = React.memo((props) => {
  const {
    label,
    variant = TextFieldVariant.Standard,
    value,
    setValue,
    required = false,
  } = props;

  return (
    <TextField
      inputProps={{ inputMode: 'numeric', pattern: `[0-9]*` }}
      required={required}
      label={label}
      variant={variant}
      value={value}
      fullWidth
      onChange={(e) => {
        const n = Number(e.target.value);

        if (!Number.isNaN(n)) {
          setValue(n);
        }
      }}
    />
  );
});
