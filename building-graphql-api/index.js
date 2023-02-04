const { ApolloServer } = require("apollo-server");
const SessionAPI = require("./datasources/sessions");
const SpeakerAPI = require("./datasources/speakers");

const typeDefs = require("./schema");

const resolvers = require("./resolvers");

// Data Sources
const dataSources = () => {
  return {
    sessionAPI: new SessionAPI(),
    speakerAPI: new SpeakerAPI(),
  };
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => console.log(`graphQL running at ${url}`));
