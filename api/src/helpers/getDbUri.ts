import { ENV, getEnvVariable } from './getEnvVariable';

const dbName = getEnvVariable(ENV.DBName);
const userName = getEnvVariable(ENV.DBUserName);
const host = getEnvVariable(ENV.DBHost);
const port = Number(getEnvVariable(ENV.DBPort));
const password = getEnvVariable(ENV.DBPassword);

export const getDbUri = () => (
  `postgres://${userName}:${password}@${host}:${port}/${dbName}`
);
