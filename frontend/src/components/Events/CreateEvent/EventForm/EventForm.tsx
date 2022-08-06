import React, { FC } from 'react';
import { Paper } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' }, overflow: 'hidden' }}
        >
          <LoadEventLogo />
        </Paper>

        <Paper
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' }, overflow: 'hidden' }}
          style={{ paddingBottom: 0 }}
        >
          <EventLocation />
        </Paper>

        <Paper
          className={styles.content}
          elevation={10}
          sx={{ borderRadius: { xs: '0', md: '16px' }, overflow: 'hidden' }}
        >
          <EventInformation />
          <LoadingButton
            type="submit"
            color='success'
            fullWidth
            variant='contained'
            sx={{
              marginTop: { xs: '32px', md: '64px' },
            }}
          >
            Save
          </LoadingButton>
        </Paper>
      </form>
    </div>
  );
});
