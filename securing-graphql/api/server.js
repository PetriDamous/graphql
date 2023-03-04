require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const SessionDataSource = require("./datasources/sessions");
const SpeakerDataSource = require("./datasources/speakers");
const UserDataSource = require("./datasources/users");

const typeDefs = require("./schema.js");
const resolvers = require("./resolvers/index");
const auth = require("./utils/auth");

const dataSources = () => ({
  sessionDataSource: new SessionDataSource(),
  speakerDataSource: new SpeakerDataSource(),
  userDataSource: new UserDataSource(),
});

// We add context to our AppolloServer constructor.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,

  // We pass in our call back function and deconstruct the
  // request object from the function parameter.
  context: ({ req }) => {
    // For now we set our user variable to null
    // until we verify our authorization header.

    let user = null;

    // Grab the autherization header.
    if (req.headers.authorization) {
      // Now we verify our token using our auth lib.
      const payload = auth.verifyToken(req.headers.authorization);
      console.log("payload", payload);

      // We set the verification on the user variable to be
      // use through our context in the resolvers.
      // Note: the user variable will either be true or false
      // depending if the user can be verified or not.
      user = payload;
    }

    // Returning the user variable will grant access to it
    // in our context in resolvers.
    return { user };
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});
