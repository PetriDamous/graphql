import React, { useContext } from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AuthContext } from "./AuthProvider";

export function ApolloProvider({ children }) {
  const { auth } = useContext(AuthContext);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "/graphql",
      headers: auth.token ? { authorization: auth.token } : null,
    }),
  });

  return <Provider client={client}>{children}</Provider>;
}
