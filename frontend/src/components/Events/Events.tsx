import {
  FC, memo, useMemo, useState,
} from 'react';
import { useEventsQuery } from '../../controllers/graphql/generated';
import { EventsList } from './EventsList/EventsList';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';
import { Container } from '../UI/Container/Container';
import { GoogleSelect } from '../../ui/Selects/GoogleSelect/GoogleSelect';
import {
  GoogleSelectTypes,
  PlaceType,
} from '../../ui/Selects/GoogleSelect/GoogleSelect.typedefs';

export const Events: FC = memo(() => {
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();
  const [value, setValue] = useState<PlaceType | null>(null);

  const authUser = useAuthUser();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  return (
    <Container pageTitle="Events" isLoading={eventsLoading}>
      <>
        <GoogleSelect
          type={[GoogleSelectTypes.Cities]}
          onChange={setValue}
          value={value}
        />

        <EventsList events={events} user={authUser} />
      </>
    </Container>
  );
});
