const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const PORT = 3000;

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }

    type Product {
        id: ID!
        price: Int!
        discription: String
        reviews: [Review]
    }

    type Review {
        rating: Float!
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        product: Product!
        quantity: Int!

    }
`);

const root = {
  products: [
    {
      id: "xbox360",
      price: 350,
      discription: "Red ring of death",
    },
    {
      id: "ps5",
      price: 500,
      discription: "Pure crap",
    },
  ],

  orders: [
    {
      date: "2005-05-05",
      subtotal: 1000,
      items: [
        {
          product: {
            id: "ps5",
            price: 500,
            discription: "Was a good system",
          },
          quantity: 2,
        },
      ],
    },
  ],
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
