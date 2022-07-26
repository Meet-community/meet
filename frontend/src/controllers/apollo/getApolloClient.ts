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
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: 'include',
  });

  client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link,
  });

  return client;
};
