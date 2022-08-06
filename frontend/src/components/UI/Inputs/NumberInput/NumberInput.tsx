import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { TextFieldVariant } from '../input.typdefs';
import { Maybe } from '../../../../controllers/graphql/generated';

interface Props {
  minValue?: number | null;
  maxValue?: number | null;
  label: string;
  variant?: TextFieldVariant;
  value: number;
  setValue: (v: number) => void;
  required?: boolean;
  error?: boolean;
  helperText?: Maybe<string>
}

export const NumberInput: FC<Props> = React.memo((props) => {
  const {
    label,
    variant = TextFieldVariant.Standard,
    value,
    setValue,
    required = false,
    error = false,
    helperText,
  } = props;

  return (
    <TextField
      inputProps={{ inputMode: 'numeric', pattern: `[0-9]*` }}
      required={required}
      label={label}
      variant={variant}
      value={value}
      fullWidth
      error={error}
      helperText={helperText}
      onChange={(e) => {
        const n = Number(e.target.value);

        if (!Number.isNaN(n)) {
          setValue(n);
        }
      }}
    />
  );
});
