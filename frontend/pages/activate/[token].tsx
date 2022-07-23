import { ApolloProvider } from '@apollo/client';
import { initApollo } from '../../src/controllers/apollo/getApolloClient';
import { Activate } from '../../src/components/Activate/Activate';


export default function () {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Activate />
      </ApolloProvider>
  );
};
