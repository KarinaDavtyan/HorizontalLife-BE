import Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import { importSchema } from 'graphql-import'

import types from './graphql/types/main.graphql';
import resolvers from './graphql/resolvers/main.js';

const port = 3000;
const host = 'localhost';

const typeDefs = importSchema(types)

const server = new ApolloServer({ typeDefs, resolvers });
const app = new Koa();
server.applyMiddleware({ app });

app.listen(port, host, () =>
  console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`), //eslint-disable-line
);