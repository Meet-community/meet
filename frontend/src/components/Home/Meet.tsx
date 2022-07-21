import { FC, memo, useEffect, useState } from 'react';
import {
  gql,
  useApolloClient
} from '@apollo/client';
import Link from 'next/link';

export const Meet: FC = memo(() => {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const client = useApolloClient();

  useEffect(() => {
    client.query({
      query: gql`
        query Users {
          users {
            lastName
            firstName
            id
            userName
          }
        }
      `,
    })
    .then((el) => setUsers(el.data.users));

    client.query({
      query: gql`
        query Notes {
          notes {
            id
            note
          }
        }
      `,
    })
    .then((el) => setNotes(el.data.notes));

  }, [])

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>

        <Link href="/home">
          <a>Go home</a>
        </Link>

        {users.map(user => (
          <h2 key={user.lastName}>
            {`${user.firstName} ${user.lastName}`}
          </h2>
        ))}
        <ul>
          {notes.map(({ note }) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </main>
    </div>
  )
});
