import React, { FC, FormEvent } from 'react';
import { Paper } from '@mui/material';
import { EventFormValues } from './eventForm.typedfs';
import styles from './EventForm.module.scss';
import { LoadEventLogo } from './Image/LoadEventLogo';
import { EventInformation } from './EventInformation/EventInformation';
import { EventLocation } from './EventLocation/EventLocation';

interface Props {
  onSubmit: (v: FormEvent<HTMLFormElement>) => any;
  defaultValues: Partial<EventFormValues>;
  loading: boolean;
}

export const EventForm: FC<Props> = React.memo((props) => {
  const { onSubmit, loading } = props;

  return (
    <div>
      <form onSubmit={onSubmit}>

        <Paper
          className={styles.box}
          elevation={10}
        >
          <LoadEventLogo />
        </Paper>

        <Paper
          className={styles.box}
          elevation={10}
        >
          <EventLocation />
        </Paper>

        <Paper
          className={styles.box}
          elevation={10}
        >
          <EventInformation loading={loading} />
        </Paper>
      </form>
    </div>
  );
});
