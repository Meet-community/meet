import { ApolloProvider } from '@apollo/client';
import { initApollo } from 'apollo/getApolloClient';
import { Meet } from '../src/components/Home/Meet';

export default function Home() {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Meet />
    </ApolloProvider>
  );
}
