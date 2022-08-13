import { FC, memo } from 'react';
import {
  EventFullFragment,
} from '../../../controllers/graphql/generated';
import { EventCard } from '../EventCard/EventCard';
import styles from './EventsList.module.scss';
import {
  useAuthUser,
} from '../../../controllers/entities/user/useAuthUserHook';

interface Props {
  events: EventFullFragment[];
}

export const EventsList: FC<Props> = memo((props) => {
  const { events } = props;

  const authUser = useAuthUser();

  return (
    <div className={styles.grid}>
      {events.map((event) => {
        const isParticipant = authUser
          ? event.participants.some((el) => el.id === authUser.id)
          : false;

        const isCreator = authUser
          ? event.creator.id === authUser.id
          : false;

        return (
          <EventCard
            key={event.id}
            event={event}
            isParticipant={isParticipant}
            isCreator={isCreator}
          />
        );
      })}
    </div>
  );
});
