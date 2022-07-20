import { FC, memo, useState } from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const Meet: FC = memo(() => {
  const [users, setUsers] = useState([]);

  const client = new ApolloClient({
    uri: 'http://localhost:4000/api',
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql`
        query Users {
          users {
            lastName,
            firstName
          }
        }
    `,
    })
    .then((el) => setUsers(el.data.users));

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>

        {users.map(user => (
          <h2 key={user.lastName}>
            {`${user.firstName} ${user.lastName}`}
          </h2>
        ))}
      </main>
    </div>
  )
});
