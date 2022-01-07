const path = require("path");
const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const PORT = 3000;

const typesArray = loadFilesSync(path.join(__dirname, "**/*.graphql"));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
});

const root = {
  products: require("./products/products.model"),

  orders: require("./orders/orders.model"),
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(PORT, () => console.log(`Graphql on port ${PORT}`));
