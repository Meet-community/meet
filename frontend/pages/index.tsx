import { ApolloProvider } from '@apollo/client';
import { Meet } from '../src/components/Home/Meet';
import { initApollo } from '../src/controllers/apollo/getApolloClient';


export default function Index() {
  return (
      <Meet />
  );
};
