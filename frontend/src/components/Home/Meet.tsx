import {
  FC, memo, useMemo, useState,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  useCreateUserEventMutation,
  useEventsQuery,
  UserEventStatus,
  useSignUpMutation,
} from '../../controllers/graphql/generated';
import { useAuthUser } from '../../controllers/entities/user/useAuthUserHook';

export const Meet: FC = memo(() => {
  const [subscribeToEvent] = useCreateUserEventMutation({
    onError: (e) => window.alert(e.message),
  });
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();
  const [signUp, {
    loading: signUpLoading,
  }] = useSignUpMutation({
    onError: () => { /* empty */ },
    onCompleted: () => { /* empty */ },
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const signUpHandler = () => {
    signUp({
      variables: {
        args: {
          email, firstName, lastName, password,
        },
      },
    });
  };

  const authUser = useAuthUser();

  const events = useMemo(() => (eventsData?.events
    ? eventsData.events
    : []
  ), [eventsData]);

  const subscribeHandler = (eventId: number) => {
    subscribeToEvent({ variables: { args: { eventId } } });
  };

  const unSubscribeHandler = (eventId: number) => {
    subscribeToEvent({
      variables: {
        args: {
          eventId, status: UserEventStatus.Canceled,
        },
      },
    });
  };

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>
        {!authUser && (
          <Link href="/signIn">
            <a>Go signIn</a>
          </Link>
        )}

        <div style={{ marginBottom: '32px' }} />

        <form onSubmit={(e) => {
          e.preventDefault();
          signUpHandler();
        }}
        >
          <input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
          />
          <input
            placeholder="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
          />
          <input
            placeholder="lstName"
            onChange={(e) => setLastName(e.target.value)}
            type="text"
          />

          <button disabled={signUpLoading} type="submit">Reg</button>
        </form>

        <h4>-----------------------------------------------</h4>
        <h2>Events</h2>

        {eventsLoading && <h3>Event loading</h3>}

        {events.map((event, i) => {
          const isParticipant = authUser
            ? event.participants.some((el) => el.id === authUser.id)
            : false;

          return (
            <div style={{
              backgroundColor: i % 2 === 0 ? 'lightblue' : 'lightgreen',
              maxWidth: '800px',
              margin: '50px auto',
            }}
            >
              <img
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                src={event.logo || ''}
                alt=""
              />
              <h3>{event.title}</h3>
              <h4>{`${event.creator.firstName} ${event.creator.lastName} - ${new Date(event.startAt).toLocaleString()}`}</h4>
              <p>{event.description}</p>
              <button
                type="button"
                onClick={() => (isParticipant
                  ? unSubscribeHandler(event.id)
                  : subscribeHandler(event.id)
                )}
              >
                {isParticipant ? 'Unsubscribe' : 'Subscribe'}
              </button>
              <ul>
                {event.participants.length === 0 && (
                  <h5>No participants</h5>
                )}
                {event.participants.map((user) => (
                  <li>{`${user.firstName} ${user.lastName}`}</li>
                ))}
              </ul>
              <hr />
            </div>
          );
        })}
      </main>
    </div>
  );
});
