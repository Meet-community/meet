import { FC, memo, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  useEventsQuery, useLogOutMutation, useSignUpMutation,
  useUsersQuery
} from '../../controllers/graphql/generated';
import { useApolloClient } from '@apollo/client';

export const Meet: FC = memo(() => {
  const { data: eventsData, loading: eventsLoading } = useEventsQuery();
  const [logOut] = useLogOutMutation();
  const [signUp, {
    loading: signUpLoading,
  }] = useSignUpMutation({
    onError: console.log,
    onCompleted: console.log
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [isAuth, setIsAuth] = useState(true);

  const { data, loading } = useUsersQuery({
    onError: () => setIsAuth(false),
  });

  const client = useApolloClient();

  const signUpHandler = () => {
    signUp({
      variables: {
        args: {
          email, firstName, lastName, password
        }
      }
    })
  }

  const users = useMemo(() => (data?.users
      ? data.users
      : []
  ), [data]);

  const events = useMemo(() => (eventsData?.events
      ? eventsData.events
      : []
  ), [eventsData]);

  const logOutHandler = async () => {
    await logOut();
    await client.clearStore();
    document.location.reload();
  }

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>

        <button type="button" onClick={logOutHandler}>LogOut</button>

        <Link href="/">
          <a>Go home</a>
        </Link>

        <span>{`  /  `}</span>

        <Link href="/signIn">
          <a>Go signIn</a>
        </Link>

        <div style={{marginBottom: '32px'}}></div>


        <form onSubmit={e => {
          e.preventDefault();
          signUpHandler();
        }}>
          <input placeholder="email" onChange={e => setEmail(e.target.value)}
                 type="text"/>
          <input placeholder="password"
                 onChange={e => setPassword(e.target.value)} type="text"/>
          <input placeholder="firstName"
                 onChange={e => setFirstName(e.target.value)} type="text"/>
          <input placeholder="lstName"
                 onChange={e => setLastName(e.target.value)} type="text"/>

          <button disabled={signUpLoading} type="submit">Reg</button>
        </form>


        {loading && <h2>Loading...</h2>}

        <h4>-----------------------------------------------</h4>
        <h2>Users</h2>

        {!loading && !isAuth && (<h2 style={{color: 'red'}}>login_not_authorized</h2>)}

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
