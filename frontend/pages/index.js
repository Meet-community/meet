import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Meet } from '../src/components/Home/Meet';


export default function Home() {
  const client = new ApolloClient({
    uri: 'https://flyby-gateway.herokuapp.com/',
    cache: new InMemoryCache(),
  });
  
  return (
    <ApolloProvider client={client}>
      <Meet />
    </ApolloProvider>
  );
};
