import { FC, memo } from 'react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';

export const Meet: FC = memo(() => {
  const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
  });

  client
    .query({
      query: gql()`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
    })
    .then((result) => console.log(result));

  return (
    <div className="container">
      <main>
        <h1>Meet</h1>
      </main>
    </div>
  )
});
