import memoize from 'lodash/memoize';
import Amplitude from 'amplitude-js';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

const initialize = memoize(() => {
  const key = getEnvVariable(ENV.AmplitudeApiKey);

  Amplitude.getInstance().init(key, undefined, {
    includeReferrer: true,
    disableCookies: true,
  });
});

export const logAmplitudeEvent = (stage: string, eventName: string, eventProperties?: any) => {
  initialize();
  Amplitude.getInstance().logEvent(eventName, eventProperties);
};

export const setAmplitudeUserId = (
  stage: string,
  userId: number | null,
  args: any,
) => {
  initialize();

  Amplitude.getInstance().setUserId(String(userId));
  Amplitude.getInstance().setUserProperties(args);
};
