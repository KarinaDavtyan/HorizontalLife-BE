import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { importSchema } from 'graphql-import';
import KoaRouter from 'koa-router';
import { koa as voyagerMiddleware } from 'graphql-voyager/middleware';

import types from './graphql/types/main.graphql';
import resolvers from './graphql/resolvers/main.js';

const port = process.env.PORT || 3000;
const host = 'localhost';

const typeDefs = importSchema(types);

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();
const router = new KoaRouter();

//visualisation middleware
router.all('/voyager', voyagerMiddleware({
  endpointUrl: '/graphql'
}));

app.use(router.routes());

server.applyMiddleware({ app });

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`), //eslint-disable-line
);