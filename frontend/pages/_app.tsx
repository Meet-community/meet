import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getConfig from 'next/config';
import { initApollo } from '../src/controllers/apollo/getApolloClient';
import './_app.css';

export default function MyApp({ Component, pageProps, apiUrl }: any) {
  const client = initApollo(apiUrl);

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
      </Head>

      <ThemeProvider theme={darkTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async () => {
  const { publicRuntimeConfig } = getConfig();

  const apiUrl = publicRuntimeConfig.API_URL;

  return { apiUrl };
};
