import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import getConfig from 'next/config';
import { initApollo } from '../src/controllers/apollo/getApolloClient';
import './_app.css';
import { useStageGuards } from '../src/hooks/useStageGuards';

export default function MyApp({ Component, pageProps, apiUrl }: any) {
  useStageGuards();
  const client = initApollo(apiUrl);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ApolloProvider client={client}>
      <Head>
        <title>Meet up to easy</title>

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
