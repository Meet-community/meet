import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import * as AdminJSSequelize from '@adminjs/sequelize';
import express from 'express';
import Connect from 'connect-pg-simple';
import session from 'express-session';
import { ENV, getEnvVariable } from '../src/helpers/getEnvVariable';
import { getDbUri } from '../src/helpers/getDbUri';
import { Models } from '../src/models';

const ADMIN_JS_PORT = getEnvVariable(ENV.AdminJsPort);

const DEFAULT_ADMIN = {
  email: 'admin',
  password: 'admin',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }

  return null;
};

export const initAdminJs = async (models: Models) => {
  const app = express();

  AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
  });

  const adminOptions = {
    resources: Object.values(models),
  };

  const admin = new AdminJS(adminOptions);

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: getDbUri(),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    tableName: 'session',
    createTableIfMissing: true,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: 'adminjs',
      cookiePassword: 'sessionsecret',
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: 'sessionsecret',
      cookie: {
        httpOnly: process.env.NODE_ENV === 'production',
        secure: process.env.NODE_ENV === 'production',
      },
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter);

  app.listen(ADMIN_JS_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`AdminJS started on http://localhost:${ADMIN_JS_PORT}${admin.options.rootPath}`);
  });
};
