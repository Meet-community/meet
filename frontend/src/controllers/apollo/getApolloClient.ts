// @ts-ignore
import { ApolloClient, InMemoryCache } from '@apollo/client';

let client: ApolloClient | null;

export const initApollo = () => {
  console.log(client)
  if (client) {
    return client;
  }

  client = new ApolloClient({
    uri: 'http://localhost:4000/api',
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });

  return client
}
