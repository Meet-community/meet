const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const host = process.env.DB_HOST;
const port = Number(process.env.DB_PORT);
const password = process.env.DB_PASSWORD;

const dbConfig = {
  database,
  username,
  password,
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
  seederStorage: 'sequelize',
}

module.exports = {
  development: {
    ...dbConfig,
  }
}
