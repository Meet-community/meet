import { useCallback, useMemo } from 'react';
import { useAppContext } from '../../controllers/AppContext/useAppContext';
import { logAmplitudeEvent, setAmplitudeUserId } from './AmplitudeAnalytics';
import { UserFullFragment } from '../../controllers/graphql/generated';

export enum AmplitudeAnalyticsEvents {
  WebsiteVisit = 'website_visit',
  SignIn = 'sign_in',
  SignUp = 'sign_up',
  Logout = 'logout',
  EmailConfirmation = 'email_confirmation',
  ForgotPasswordPageOpened = 'forgot_password_page_opened',
  ForgotPasswordRequest = 'forgot_password_request',
  ForgotPasswordConfirmed = 'forgot_password_confirmed',
}

interface HookOutput {
  logEvent: (event: AmplitudeAnalyticsEvents, properties?: any) => void;
  setUserId: (authUser: UserFullFragment | null) => void;
}

export const useAmplitudeAnalytics = (
  argStage?: string,
  argsAmplitudeApiKey?: string,
): HookOutput => {
  const { stage: appStage, amplitudeApiKey: appAmplitudeApiKey } = useAppContext();

  const stage = useMemo(() => (
    argStage || appStage
  ), [appStage, argStage]);

  const amplitudeApiKey = useMemo(() => (
    argsAmplitudeApiKey || appAmplitudeApiKey
  ), [appAmplitudeApiKey, argsAmplitudeApiKey]);

  const logEvent = useCallback((
    event: AmplitudeAnalyticsEvents,
    eventProperties?: any,
  ) => (
    logAmplitudeEvent({
      eventName: event,
      eventProperties,
      amplitudeApiKey,
    })
  ), [amplitudeApiKey]);

  const setUserId = useCallback((
    authUser: UserFullFragment | null,
  ) => (
    setAmplitudeUserId({
      amplitudeApiKey,
      userId: authUser?.id || null,
      args: {
        email: authUser?.email,
        firstName: authUser?.firstName,
        lastName: authUser?.lastName,
      },
    })
  ), [amplitudeApiKey]);

  if (stage !== 'production') {
    return {
      logEvent: () => { /* empty */ },
      setUserId: () => { /* empty */ },
    };
  }

  return {
    logEvent,
    setUserId,
  };
};
