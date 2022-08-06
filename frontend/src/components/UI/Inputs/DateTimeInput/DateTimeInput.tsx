import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { uk as locale } from 'date-fns/locale';
import { TextFieldVariant } from '../input.typdefs';

interface Props {
  value: Date;
  setValue: (d: Date) => void;
  minValue?: Date;
  maxValue?: Date;
  minTime?: Date;
  label: string;
  variant?: TextFieldVariant;
  required?: boolean;
}

const getMaxValue = (minValue: Date) => {
  const maxValueDate = new Date(minValue);

  maxValueDate.setDate(maxValueDate.getDate() + 90);

  return maxValueDate;
};

export const DateTimeInput: React.FC<Props> = React.memo((props) => {
  const {
    value,
    setValue,
    minValue = new Date(),
    maxValue = getMaxValue(minValue),
    label,
    variant = TextFieldVariant.Standard,
    required = false,
  } = props;

  const handleChange = (newValue: Date) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={locale}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={(d) => handleChange(d || new Date())}
        maxDate={maxValue}
        minDateTime={minValue}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={variant}
            required={required}
            fullWidth
          />
        )}
      />
    </LocalizationProvider>
  );
});
