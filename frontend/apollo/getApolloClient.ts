// @ts-ignore
import { ApolloClient, InMemoryCache } from '@apollo/client';

export class ApolloClientBuilder {
  client: undefined;

  constructor() {
    if (this.client) {
      return this.client;
    }

    this.client = new ApolloClient({
      uri: 'http://localhost:4000/api',
      cache: new InMemoryCache(),
      connectToDevTools: true,
    });

    return this.client;
  }
}
