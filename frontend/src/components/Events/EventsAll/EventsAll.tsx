import React, { FC, useEffect, useMemo } from 'react';
import { useEventsQuery } from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsAll: FC<Props> = React.memo((props) => {
  const { setIsLoading } = props;

  const { data: eventsData, loading } = useEventsQuery();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <EventsList events={events} />
  );
});
