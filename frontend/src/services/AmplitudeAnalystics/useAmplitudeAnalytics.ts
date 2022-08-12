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

export const useAmplitudeAnalytics = (argStage?: string): HookOutput => {
  const { stage: appStage } = useAppContext();
  const stage = argStage || appStage;

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
    logAmplitudeEvent(stage, event, eventProperties)
  );

  const setUserId = (
    authUser: UserFullFragment | null,
  ) => (
    setAmplitudeUserId(
      stage,
      authUser?.id || null,
      {
        email: authUser?.email,
        firstName: authUser?.firstName,
        lastName: authUser?.lastName,
      },
    )
  );

  return {
    logEvent,
    setUserId,
  };
};
