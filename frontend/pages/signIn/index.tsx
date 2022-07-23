import { ApolloProvider } from '@apollo/client';
import { initApollo } from '../../src/controllers/apollo/getApolloClient';
import { SignIn } from '../../src/components/SignIn/SignIn';


export default function () {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <SignIn />
    </ApolloProvider>
  );
};
