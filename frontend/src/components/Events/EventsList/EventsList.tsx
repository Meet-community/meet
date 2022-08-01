import { FC, memo } from 'react';
import {
  EventFullFragment,
  UserFullFragment,
} from '../../../controllers/graphql/generated';
import { EventCard } from '../EventCard/EventCard';
import styles from './EventsList.module.scss';

interface Props {
  events: EventFullFragment[];
  user: UserFullFragment | null;
}

export const EventsList: FC<Props> = memo((props) => {
  const { events, user } = props;

  return (
    <div className={styles.grid}>
      {events.map((event) => {
        const isParticipant = user
          ? event.participants.some((el) => el.id === user.id)
          : false;

        return (
          <EventCard
            key={event.id}
            event={event}
            isParticipant={isParticipant}
          />
        );
      })}
    </div>
  );
});
