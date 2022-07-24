import { ApolloProvider } from '@apollo/client';
import { initApollo } from '../src/controllers/apollo/getApolloClient';

export default function MyApp({ Component, pageProps }: any) {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>)
}
