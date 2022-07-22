import { ApolloProvider } from '@apollo/client';
import { initApollo } from 'src/controllers/apollo/getApolloClient';
import { Meet } from 'src/components/Home/Meet';

export default function Index() {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Meet />
    </ApolloProvider>
  );
}
