const path = require("path");
const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { ApolloServer } = require("apollo-server-express");
const SessionsAPI = require("./dataSources/sessions.dataSource");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));

// const resovlersArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const dataSources = () => ({
  sessionAPI: new SessionsAPI(),
});

const resolvers = {
  Query: {
    sessions: (parent, arg, { dataSources: { sessionAPI } }, info) => {
      return sessionAPI.getSessions();
    },
  },
};

const startApolloServer = async () => {
  const app = express();

  const PORT = 4000;

  //   resolvers: resovlersArray,

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
