import { FC, memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  useEventsQuery,
  useUsersQuery
} from '../../controllers/graphql/generated';

export const Meet: FC = memo(() => {
  const { data, loading, error } = useUsersQuery();
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();

  const users = useMemo(() => (data?.users
    ? data.users
    : []
  ), [data]);

  const events = useMemo(() => (eventsData?.events
      ? eventsData.events
      : []
  ), [eventsData]);

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>

        <Link href="/home">
          <a>Go home</a>
        </Link>

        {loading && <h2>Loading...</h2>}

        {users.map(user => (
          <h3 key={user.id}>
            {`${user.firstName} ${user.lastName}`}
          </h3>
        ))}

        <h4>-----------------------------------------------</h4>
        <h2>Events</h2>

        {eventsLoading && <h3>Event loading</h3>}

        {events.map(event => (
          <div>
            <img src={event.logo || ''} alt=""/>
            <h3>{event.title}</h3>
            <h4>{`${event.creator.firstName} ${event.creator.lastName} - ${new Date(event.startAt).toLocaleString()}`}</h4>
            <p>{event.description}</p>
          </div>
        ))}
      </main>
    </div>
  )
});
