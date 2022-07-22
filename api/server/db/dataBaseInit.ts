import { Sequelize } from 'sequelize-typescript';
import { models } from 'src/models';

export const dbInit = async () => {
  const dbName = process.env.DB_NAME as string;
  const userName = process.env.DB_USERNAME as string;
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT);
  const password = process.env.DB_PASSWORD as string;

  // @ts-ignore
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
  )

  await sequelize.authenticate();
  console.log('📓📓📓 Connection to db has been established successfully.');

  return sequelize;
}
