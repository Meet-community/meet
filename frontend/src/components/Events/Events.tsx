import {
  FC, memo, useMemo,
} from 'react';
import { useEventsQuery } from '../../controllers/graphql/generated';
import { EventsList } from './EventsList/EventsList';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { PageContainer } from '../UI/Container/PageContainer';

export const Events: FC = memo(() => {
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();
  const authUser = useAuthUser();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  return (
    <PageContainer pageTitle="Events" isLoading={eventsLoading}>
      <EventsList events={events} user={authUser} />
    </PageContainer>
  );
});
