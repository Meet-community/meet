import React, { memo, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { Paper } from '@mui/material';
import { useEventLazyQuery } from '../../controllers/graphql/generated';
import { ROUTES } from '../../../routes/routes';
import { EventParticipants } from './EventParticipants';
import { GoogleMaps } from '../Events/CreateEvent/GoogleMaps/GoogleMaps';
import { EventLogo } from './EventLogo';
import { EventInfo } from './EventInfo';
import styles from './Event.module.scss';

export const Event = memo(() => {
  const router = useRouter();
  const { id: idFromQuery } = router.query;

  const [loadEvent, { data, loading }] = useEventLazyQuery({
    onError: () => router.push(ROUTES.home),
  });

  const id = useMemo(() => Number(idFromQuery), [idFromQuery]);

  const event = useMemo(() => (data?.event
    ? data.event
    : null
  ), [data]);

  useEffect(() => {
    if (!Number.isNaN(id) && !loading) {
      loadEvent({ variables: { id } });
    }
  }, [id, loadEvent, loading]);

  return (
    <Paper
      className={styles.box}
      elevation={10}
    >
      <EventLogo event={event} loading={loading} />

      <div className={styles.content}>
        <EventInfo event={event} loading={loading} />

        <EventParticipants event={event} />
      </div>

      <div className={styles.googleMaps}>
        <GoogleMaps placeId={event?.city.googleId} />
      </div>
    </Paper>
  );
});
