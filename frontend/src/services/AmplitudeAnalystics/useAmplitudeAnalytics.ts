import { useAppContext } from '../../controllers/AppContext/useAppContext';
import { logAmplitudeEvent, setAmplitudeUserId } from './AmplitudeAnalytics';
import { UserFullFragment } from '../../controllers/graphql/generated';

export enum UseAmplitudeAnalytics {
  WebsiteVisit = 'website_visit',
}

interface HookOutput {
  logEvent: (event: UseAmplitudeAnalytics, properties?: any) => void;
  setUserId: (authUser: UserFullFragment | null) => void;
}

export const useAmplitudeAnalytics = (
  argStage?: string,
  argsAmplitudeApiKey?: string,
): HookOutput => {
  const { stage: appStage, amplitudeApiKey: appAmplitudeApiKey } = useAppContext();
  const stage = argStage || appStage;
  const amplitudeApiKey = argsAmplitudeApiKey || appAmplitudeApiKey;

  if (stage !== 'production') {
    return {
      logEvent: () => { /* empty */ },
      setUserId: () => { /* empty */ },
    };
  }

  const logEvent = (
    event: UseAmplitudeAnalytics,
    eventProperties?: any,
  ) => (
    logAmplitudeEvent({
      eventName: event,
      eventProperties,
      amplitudeApiKey,
    })
  );

  const setUserId = (
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
  );

  return {
    logEvent,
    setUserId,
  };
};
