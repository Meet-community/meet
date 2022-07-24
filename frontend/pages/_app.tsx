import { ApolloProvider } from '@apollo/client';
import { initApollo } from '../src/controllers/apollo/getApolloClient';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: any) {
  const client = initApollo();

  return (
    <ApolloProvider client={client}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <title>Meet</title>

        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <Component {...pageProps} />
    </ApolloProvider>
  )
}
