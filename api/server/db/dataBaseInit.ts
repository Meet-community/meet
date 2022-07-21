import { Sequelize } from 'sequelize';

export const dbInit = async () => {
  const dbName = process.env.DB_NAME as string;
  const userName = process.env.DB_USERNAME as string;
  const host = process.env.DB_HOST;
  const port = Number(process.env.DB_PORT);
  const password = process.env.DB_PASSWORD as string;

  console.log({
    dbName, userName, host, port, password
  })

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
      }
    }
  )

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
