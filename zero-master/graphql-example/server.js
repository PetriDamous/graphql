const path = require("path");
const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const PORT = 3000;

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resovlersArray = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: resovlersArray,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Graphql on port ${PORT}`));
