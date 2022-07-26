import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
// @ts-ignore
import dotenv from 'dotenv';
// @ts-ignore
import cookieParser from 'cookie-parser';
// @ts-ignore
import express from 'express';
import { dbInit } from './db/dataBaseInit';
import { Models } from '../src/models';
import { typeDefs } from '../src/modules/schema';
import { resolvers } from '../src/modules/resolvers';
import { jwtService } from '../src/services/jwtService/jwtService';
import { User } from '../src/models/User';
import { UserStatus } from '../src/modules/user/user.typedefs';
import { Ctx } from './typedefs';

async function initApolloServer(typeDefs: any, resolvers: any) {
  const app = express();

  app.use(cookieParser());
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
      };
    },
  });

  await server.start();

  const clientUrl = process.env.CLIENT_URL as string;
  const graphqlSendBoxUrl = process.env.STAGE === 'development'
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

  await new Promise<void>(
    (resolve) => httpServer.listen({ port: 4000 }, resolve)
  );

  // eslint-disable-next-line no-console
  console.log(`🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const serverInit = () => {
  dotenv.config({ path: '.env' });
  initApolloServer(typeDefs, resolvers);
};

serverInit();
