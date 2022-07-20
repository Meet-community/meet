import { ApolloProvider } from '@apollo/client';
import { Meet } from '../src/components/Home/Meet';
import { ApolloClientBuilder } from "../apollo/getApolloClient";


export default function Index() {
  const client = new ApolloClientBuilder();

  return (
    <ApolloProvider client={client}>
      <Meet />
    </ApolloProvider>
  );
};
