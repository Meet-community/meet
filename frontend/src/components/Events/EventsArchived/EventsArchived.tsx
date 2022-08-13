import React, { FC, useEffect, useMemo } from 'react';
import {
  useArchivedEventsQuery,
} from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsArchived: FC<Props> = React.memo((props) => {
  const { setIsLoading } = props;

  const { data: eventsData, loading } = useArchivedEventsQuery();

  const events = useMemo(() => (eventsData?.archivedEvents
    ? eventsData.archivedEvents
    : []
  ), [eventsData]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <EventsList events={events} />
  );
});
