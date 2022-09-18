export enum ENV {
  NodeEnv = 'NODE_ENV',
  DBName = 'DB_NAME',
  DBHost = 'DB_HOST',
  DBUserName = 'DB_USERNAME',
  DBPort = 'DB_PORT',
  DBPassword = 'DB_PASSWORD',
  ClientUrl = 'CLIENT_URL',
  Port = 'PORT',
  SMPTHost = 'SMPT_HOST',
  SMPTPort = 'SMPT_PORT',
  SMPTUser = 'SMPT_USER',
  SMPTPassword = 'SMPT_PASSWORD',
  JWTAccessSecret = 'JWT_ACCESS_SECRET',
  CloudinaryCloudName = 'CLOUDINARY_CLOUD_NAME',
  CloudinaryApiKey = 'CLOUDINARY_API_KEY',
  CloudinaryApiSecret = 'CLOUDINARY_API_SECRET',
  GooglePlaceApiKey = 'GOOGLE_PLACE_API_KEY',
  TrelloApiKey = 'TRELLO_API_KEY',
  TrelloOAuth = 'TRELLO_O_AUTH',
  TrelloFeedbackListId = 'TRELLO_FEEDBACK_LIST_ID',
}

export const getEnvVariable = (key: ENV): string => {
  const value = process.env[key];

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
