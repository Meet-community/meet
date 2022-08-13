import React, { FC, useEffect, useMemo } from 'react';
import {
  usePlannedEventsQuery,
} from '../../../controllers/graphql/generated';
import { EventsList } from '../EventsList/EventsList';
import {
  useWithAuthPage,
} from '../../../controllers/entities/user/useWithAuthPage';

interface Props {
  setIsLoading: (v: boolean) => void;
}

export const EventsPlanned: FC<Props> = React.memo((props) => {
  useWithAuthPage();
  const { setIsLoading } = props;

  const { data: eventsData, loading } = usePlannedEventsQuery({
    onError: () => { /* empty */ },
    fetchPolicy: 'cache-and-network',
  });

  const events = useMemo(() => (eventsData?.plannedEvents
    ? eventsData.plannedEvents
    : []
  ), [eventsData]);

  useEffect(() => {
    setIsLoading(!events.length && loading);
  }, [events.length, loading, setIsLoading]);

  return (
    <EventsList events={events} />
  );
});
