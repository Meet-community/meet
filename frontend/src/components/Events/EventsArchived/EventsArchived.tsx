import React, { FC, useEffect, useMemo } from 'react';
import {
  useArchivedEventsQuery,
} from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';
import {
  useWithAuthPage,
} from '../../../controllers/entities/user/useWithAuthPage';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsArchived: FC<Props> = React.memo((props) => {
  useWithAuthPage();

  const { setIsLoading } = props;

  const { data: eventsData, loading } = useArchivedEventsQuery({
    onError: () => { /* empty */ },
    fetchPolicy: 'cache-and-network',
  });

  const events = useMemo(() => (eventsData?.archivedEvents
    ? eventsData.archivedEvents
    : []
  ), [eventsData]);

  useEffect(() => {
    setIsLoading(!events.length && loading);
  }, [loading, setIsLoading, events.length]);

  return (
    <EventsList events={events} />
  );
});
