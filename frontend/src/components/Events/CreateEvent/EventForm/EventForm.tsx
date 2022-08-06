import React, { FC } from 'react';
import { Paper } from '@mui/material';
import { EventFormValues } from './eventForm.typedfs';
import styles from './EventForm.module.scss';
import { LoadEventLogo } from './Image/LoadEventLogo';
import { EventInformation } from './EventInformation/EventInformation';
import { EventLocation } from './EventLocation/EventLocation';

interface Props {
  onSubmit: (v: EventFormValues) => Promise<any>;
  defaultValues: Partial<EventFormValues>
}

export const EventForm: FC<Props> = React.memo(() => {
  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line no-console
        console.log('submit');
      }}
      >

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
          <EventInformation />
        </Paper>
      </form>
    </div>
  );
});
