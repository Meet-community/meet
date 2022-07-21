import express from 'express'
import * as http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { typeDefs } from './shema';
import { resolvers } from './resolvers';
import { dbInit } from './db/dataBaseInit';
import dotenv from 'dotenv'

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000"
    },
    path: "/api",
  });

  await dbInit();

  await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀🚀🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const serverInit = () => {
  dotenv.config({ path: '.env' });
  startApolloServer(typeDefs, resolvers);
}

serverInit();

