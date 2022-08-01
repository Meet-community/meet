import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

let client: ApolloClient<NormalizedCacheObject> | null;

export const initApollo = (apiUrl: string) => {
  if (client) {
    return client;
  }

  // eslint-disable-next-line no-console
  console.log({
    apiUrl,
  });

  const link = createUploadLink({
    uri: apiUrl,
    credentials: 'include',
    headers: {
      'Apollo-Require-Preflight': 'true',
    },
  });

  client = new ApolloClient({
    cache: new InMemoryCache(),
    connectToDevTools: true,
    link,
  });

  return client;
};
