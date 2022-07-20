import { ApolloProvider } from '@apollo/client';
import { initApollo } from "../apollo/getApolloClient";
import { useEffect } from 'react';
import gql from 'graphql-tag';


export default function Home() {
  const client = initApollo();

  useEffect(() => {
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
  }, [])

  return (
    <ApolloProvider client={client}>
      <h2>home</h2>
    </ApolloProvider>
  );
};
