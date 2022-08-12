import getConfig from 'next/config';

export enum ENV {
  ApiUrl = 'API_URL',
  GooglePlaceApiKey = 'GOOGLE_PLACE_API_KEY',
  Stage = 'STAGE',
  UnsplashAccessKey = 'UNSPLASH_ACCESS_KEY',
  AmplitudeApiKey = 'AMPLITUDE_API_KEY',
}

export const getEnvVariable = (key: ENV): string => {
  const { publicRuntimeConfig = {} } = getConfig();

  const value = publicRuntimeConfig[key];

  if (!value) {
    throw new Error(`

    ❌              📒            ❌
    Env variable is required ${key}
    Restart server after adding
    ❌              📒            ❌

    `);
  }

  return value;
};
