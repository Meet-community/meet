import express from 'express'
import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { dbInit } from './db/dataBaseInit';
import dotenv from 'dotenv'
import { Models } from 'src/models';
import { typeDefs } from 'src/modules/schema';
import { resolvers } from 'src/modules/resolvers';

async function initApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  const db = await dbInit();
  const models: Models = db.models as Models;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: {
      models,
    }
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000"
    },
    path: "/api",
  });

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const serverInit = () => {
  dotenv.config({ path: '.env' });
  initApolloServer(typeDefs, resolvers);
}

serverInit();

