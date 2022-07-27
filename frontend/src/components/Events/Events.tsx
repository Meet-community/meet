import { FC, memo, useMemo } from 'react';
import { CircularProgress, Paper } from '@mui/material';
import { useEventsQuery } from '../../controllers/graphql/generated';
import { EventsList } from './EventsList';
import styles from './Events.module.scss';

export const Events: FC = memo(() => {
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  return (
    <Paper elevation={6} className={styles.container}>
      <h1 className={styles.title}>Events</h1>

      <EventsList events={events} />

      {eventsLoading && (
        <div className={styles.loader}>
          <CircularProgress size={80} />
        </div>
      )}
    </Paper>
  );
});
