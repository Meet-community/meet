import { ApolloProvider } from '@apollo/client';
import { Meet } from 'src/components/Home/Meet';
import { initApollo } from 'apollo/getApolloClient';

export default function Index() {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Meet />
    </ApolloProvider>
  );
}
