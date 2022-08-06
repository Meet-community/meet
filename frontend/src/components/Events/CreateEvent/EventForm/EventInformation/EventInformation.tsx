import React, { FC, useEffect, useMemo } from 'react';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';
import {
  useCreateEventContext,
} from '../../CreateEventContext/useCreateEventContext';
import {
  DateTimeInput,
} from '../../../../UI/Inputs/DateTimeInput/DateTimeInput';
import { HOUR } from '../../../../../helpers/date';
import { TimeInput } from '../../../../UI/Inputs/TimeInput/TimeInput';
import { NumberInput } from '../../../../UI/Inputs/NumberInput/NumberInput';
import { TextFieldVariant } from '../../../../UI/Inputs/input.typdefs';
import styles from './EventInformation.module.scss';

const variant: TextFieldVariant = TextFieldVariant.Standard;

interface Props {
  loading: boolean;
}

export const EventInformation: FC<Props> = React.memo(({ loading }) => {
  const {
    title, setTitle,
    description, setDescription,
    startAt, setStartAt,
    endAt, setEndAt,
    eventLink, setEventLink,
    eventLinkError, setEventLinkError,
    capacity, setCapacity,
    capacityError, setCapacityError,
  } = useCreateEventContext();

  const minTime = useMemo(() => {
    return new Date(startAt.getTime() + HOUR);
  }, [startAt]);

  useEffect(() => {
    setEndAt(new Date(startAt.getTime() + HOUR));
  }, [startAt, setEndAt]);

  return (
    <div className={styles.container}>
      <Typography
        variant='h5'
      >
        Event information
      </Typography>

      <Grid container spacing={{ xs: 1, md: 2, lg: 3 }}>

        <Grid item xs={12} md={6}>
          <TextField
            margin="none"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            placeholder='Coffee break'
            required
            fullWidth
            variant={variant}
            sx={{ marginBottom: '8px' }}
          />

          <TextField
            margin="none"
            id="eventLink"
            value={eventLink}
            onChange={(e) => {
              setEventLinkError(null);
              setEventLink(e.target.value);
            }}
            label="Event link"
            placeholder='If event have website add link here'
            fullWidth
            variant={variant}
            helperText={eventLinkError}
            error={!!eventLinkError}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            margin="none"
            id="eventDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            placeholder='Some extra information'
            fullWidth
            variant={variant}
            multiline
            rows={3.4}
            required
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <DateTimeInput
            value={startAt}
            setValue={setStartAt}
            label="Start at"
            required
            variant={variant}
          />
        </Grid>

        <Grid item xs={6} md={4}>
          <TimeInput
            value={endAt}
            setValue={setEndAt}
            label="End at"
            minValue={minTime}
            required
            variant={variant}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <NumberInput
            label="Capacity"
            value={capacity}
            setValue={(v) => {
              setCapacity(v);
              setCapacityError(null);
            }}
            required
            variant={variant}
            error={!!capacityError}
            helperText={capacityError}
          />
        </Grid>

      </Grid>

      <LoadingButton
        type="submit"
        color='success'
        fullWidth
        variant='contained'
        sx={{
          marginTop: { xs: '24px', md: '36px', lg: '40px' },
        }}
        loading={loading}
      >
        Save
      </LoadingButton>

    </div>
  );
});
