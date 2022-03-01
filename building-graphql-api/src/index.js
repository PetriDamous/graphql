const express = require("express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");

const typeDefs = require("./schema");
const dataSources = require("./dataSources");
const resolvers = require("./resolvers");

const startApolloServer = async () => {
  const app = express();

  const PORT = 4000;

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    dataSources,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => console.log(`Graphql on port ${PORT}`));
};

startApolloServer();
