import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

let client: ApolloClient<NormalizedCacheObject> | null;

export const initApollo = () => {
  if (client) {
    return client;
  }

  const link = createHttpLink({
    uri: 'http://localhost:4000/api',
    credentials: 'include',
  });

  client = new ApolloClient({
    uri: 'http://localhost:4000/api',
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link,
  });

  return client;
};
