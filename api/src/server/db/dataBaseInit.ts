import { Sequelize } from 'sequelize-typescript';
import { models } from '../../models';
import { ENV, getEnvVariable } from '../../helpers/getEnvVariable';

export const dbInit = async () => {
  const dbName = getEnvVariable(ENV.DBName);
  const userName = getEnvVariable(ENV.DBUserName);
  const host = getEnvVariable(ENV.DBHost);
  const port = Number(getEnvVariable(ENV.DBPort));
  const password = getEnvVariable(ENV.DBPassword);

  const sequelize = new Sequelize(
    dbName,
    userName,
    password,
    {
      host,
      port,
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
      models: Object.values(models),
    }
  );

  await sequelize.authenticate();
  // eslint-disable-next-line no-console
  console.log('📓📓📓 Connection to db has been established successfully.');

  return sequelize;
};
