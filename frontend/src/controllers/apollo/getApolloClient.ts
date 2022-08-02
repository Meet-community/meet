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
