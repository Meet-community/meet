import { FC, memo } from 'react';
import { EventFullFragment } from '../../controllers/graphql/generated';
import { EventCard } from './EventCard';
import styles from './EventsList.module.scss';

interface Props {
  events: EventFullFragment[];
}

export const EventsList: FC<Props> = memo((props) => {
  const { events } = props;

  return (
    <div className={styles.grid}>
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
});
