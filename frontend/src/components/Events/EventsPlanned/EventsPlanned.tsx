import React, { FC, useEffect, useMemo } from 'react';
import {
  usePlannedEventsQuery,
} from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsPlanned: FC<Props> = React.memo((props) => {
  const { setIsLoading } = props;

  const { data: eventsData, loading } = usePlannedEventsQuery();

  const events = useMemo(() => (eventsData?.plannedEvents
    ? eventsData.plannedEvents
    : []
  ), [eventsData]);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading, setIsLoading]);

  return (
    <EventsList events={events} />
  );
});
