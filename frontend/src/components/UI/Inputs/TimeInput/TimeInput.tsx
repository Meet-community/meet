import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { uk as locale } from 'date-fns/locale';
import { TextFieldVariant } from '../input.typdefs';

interface Props {
  value: Date;
  setValue: (d: Date) => void;
  minValue?: Date | null;
  label: string;
  variant?: TextFieldVariant;
  required?: boolean;
}

export const TimeInput: React.FC<Props> = React.memo((props) => {
  const {
    value,
    setValue,
    minValue = null,
    label,
    variant = TextFieldVariant.Standard,
    required = false,
  } = props;

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <TimePicker
        label={label}
        value={value}
        onChange={(d) => handleChange(d || new Date())}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            required={required}
            fullWidth
          />
        )}
        minTime={minValue}
      />
    </LocalizationProvider>
  );
});
