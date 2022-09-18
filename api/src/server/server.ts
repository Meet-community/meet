import { ApolloServer } from 'apollo-server-express';
// @ts-ignore
import * as http from 'http';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import cookieParser from 'cookie-parser';
// @ts-ignore
import express from 'express';
import { dbInit } from './db/dataBaseInit';
import { Models } from '../models';
import { typeDefs } from '../modules/schema';
import { resolvers } from '../modules/resolvers';
import { jwtService } from '../services/jwtService/jwtService';
import { User } from '../models/User';
import { UserStatus } from '../modules/user/user.typedefs';
import { Ctx } from './typedefs';
import { graphqlUploadExpress } from 'graphql-upload';
import { ENV, getEnvVariable } from '../helpers/getEnvVariable';

async function initApolloServer(typeDefs: any, resolvers: any) {
  const app = express();

  app.use(cookieParser());
  app.use(graphqlUploadExpress());
  const httpServer = http.createServer(app);

  const db = await dbInit();
  const models: Models = db.models as Models;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }): Promise<Ctx> => {
      const token = req.cookies.Authorization || req.headers.authorization;

      const data = jwtService.validateAccessToken(token);

      let user: User | null = null;

      if (data?.id && data?.email) {
        user = await User.findOne({
          where: {
            id: data.id, status: UserStatus.Confirmed,
          },
          raw: true,
        });
      }

      return {
        models,
        authUser: user,
        res,
        req,
      };
    },
  });

  await server.start();

  const clientUrl = getEnvVariable(ENV.ClientUrl);
  const nodeEnv = getEnvVariable(ENV.NodeEnv);
  const graphqlSendBoxUrl = nodeEnv === 'development'
    ? ['https://studio.apollographql.com']
    : [];

  server.applyMiddleware({
    app,
    cors: {
      origin: [clientUrl, ...graphqlSendBoxUrl],
      credentials: true,
    },
    path: '/api',
  });

  const port = Number(getEnvVariable(ENV.Port)) || 4000;

  await new Promise<void>(
    (resolve) => httpServer.listen({ port }, resolve)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  // eslint-disable-next-line no-console
  console.log(`👤👤👤 Client ready at ${clientUrl}`);
  // eslint-disable-next-line no-console
  console.log('➖➖➖➖➖➖➖➖➖🛬➖➖➖➖➖➖➖➖➖➖➖🛬➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖🛫');
}

const serverInit = () => {
  dotenv.config();
  initApolloServer(typeDefs, resolvers);
};

serverInit();
