import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { initApollo } from '../src/controllers/apollo/getApolloClient';

export default function MyApp({ Component, pageProps }: any) {
  const client = initApollo();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

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
        <style>
          {`
            body {
              margin: 0;
              padding: 0;
            }
            a {
              text-decoration: none !important;
            }
          `}
        </style>
      </Head>

      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
