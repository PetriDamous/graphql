import React from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

export function ApolloProvider({ children }) {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "/graphql",
    }),
    credentials: "same-origin",
  });

  return <Provider client={client}>{children}</Provider>;
}
