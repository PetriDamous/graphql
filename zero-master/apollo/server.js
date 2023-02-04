const path = require("path");
const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const dataAPIs = require("./model");

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const resovlersArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const startApolloServer = async () => {
  const app = express();

  const PORT = 3000;

  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resovlersArray,
  });

  const server = new ApolloServer({
    schema,
    dataSources: () => ({
      ...dataAPIs,
    }),
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(PORT, () => console.log(`localhost:${PORT}/graphql`));
};

startApolloServer();
