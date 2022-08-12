import memoize from 'lodash/memoize';
import Amplitude from 'amplitude-js';

interface LogEventOptions {
  amplitudeApiKey: string,
  eventName: string,
  eventProperties?: Object,
}

interface SetUserIdOptions {
  amplitudeApiKey: string,
  userId: number | null,
  args?: Object,
}

const initialize = memoize((amplitudeApiKey: string) => {
  Amplitude.getInstance().init(amplitudeApiKey, undefined, {
    includeReferrer: true,
    disableCookies: true,
  });
});

export const logAmplitudeEvent = (options: LogEventOptions) => {
  const { amplitudeApiKey, eventProperties, eventName } = options;

  initialize(amplitudeApiKey);
  Amplitude.getInstance().logEvent(eventName, eventProperties);
};

export const setAmplitudeUserId = (options: SetUserIdOptions) => {
  const { amplitudeApiKey, userId, args } = options;

  initialize(amplitudeApiKey);

  Amplitude.getInstance().setUserId(String(userId));
  Amplitude.getInstance().setUserProperties(args);
};
