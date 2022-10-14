import { ApolloProvider } from '@apollo/client';
import Head from 'next/head';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import { initApollo } from '../src/controllers/apollo/getApolloClient';
import './_app.css';
import '../src/styles/_utils.scss';
import { useStageGuards } from '../src/hooks/useStageGuards';
import { ENV, getEnvVariable } from '../src/helpers/getEnvVariable';
import {
  AppContextProvider,
} from '../src/controllers/AppContext/AppContextProvide';
import {
  AuthUserDocument,
  AuthUserQuery,
} from '../src/controllers/graphql/generated';
import {
  AmplitudeAnalyticsEvents,
  useAmplitudeAnalytics,
} from '../src/services/AmplitudeAnalystics/useAmplitudeAnalyticsEvents';
import { HotButtons } from '../src/components/HotButtons/HotButtons';

export default function MyApp({
  Component, pageProps, apiUrl, stage, amplitudeApiKey,
}: any) {
  useStageGuards(stage);
  const { logEvent, setUserId: setAmplitudeUserId } = useAmplitudeAnalytics(stage, amplitudeApiKey);
  const client = initApollo(apiUrl);
  const router = useRouter();
  const { source } = router.query;

  useEffect(() => {
    (async () => {
      const { data } = await client.query<AuthUserQuery>({
        query: AuthUserDocument,
      });
      const { authUser } = data;
      const { route } = router;

      setAmplitudeUserId(authUser || null);

      logEvent(AmplitudeAnalyticsEvents.WebsiteVisit, { source, route });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ApolloProvider client={client}>
      <AppContextProvider appStage={stage}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>

          <Head>
            <title>Meet up to easy</title>

            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <ThemeProvider theme={createTheme({
            palette: {
              mode: 'dark',
            },
          })}
          >
            <HotButtons />
            <Component {...pageProps} />
          </ThemeProvider>
        </SnackbarProvider>
      </AppContextProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async () => {
  const apiUrl = getEnvVariable(ENV.ApiUrl);
  const stage = getEnvVariable(ENV.Stage);
  let amplitudeApiKey = '';

  try {
    amplitudeApiKey = getEnvVariable(ENV.AmplitudeApiKey);
  } catch {
    if (stage === 'production') {
      amplitudeApiKey = getEnvVariable(ENV.AmplitudeApiKey);
    }
  }

  return { apiUrl, stage, amplitudeApiKey };
};
