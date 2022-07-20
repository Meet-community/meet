import { ApolloProvider } from '@apollo/client';
import { Meet } from '../src/components/Home/Meet';
import { ApolloClientBuilder } from "../apollo/getApolloClient";


export default function Home() {
  const client = new ApolloClientBuilder();

  return (
    <ApolloProvider client={client}>
      <h2>home</h2>
    </ApolloProvider>
  );
};
