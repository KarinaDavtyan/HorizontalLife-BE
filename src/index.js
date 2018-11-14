import Koa from 'koa';
import { ApolloServer, gql } from 'apollo-server-koa';

const port = 3000;
const host = 'localhost';

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world!',
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = new Koa();
server.applyMiddleware({ app });


app.listen(port, host, () =>
    console.log(`🚀 Server ready at http://${host}:${port}${server.graphqlPath}`),
);