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

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // eslint-disable-next-line no-console
  console.log({
    apiUrl,
  });

  const link = createHttpLink({
    uri: apiUrl,
    credentials: 'include',
  });

  client = new ApolloClient({
    uri: apiUrl,
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link,
  });

  return client;
};
