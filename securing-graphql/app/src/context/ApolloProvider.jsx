import React from "react";
import {
  ApolloProvider as Provider,
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AuthContext } from "./AuthProvider";
import { useContext } from "react";

export function ApolloProvider({ children }) {
  // We bring in our token to pass into the headers for the
  // Apollo instance that runs the Apollo part of our app.
  const authContext = useContext(AuthContext);
  const token = authContext.authInfo.token;

  // Since the Auth context sits at the very top of our app
  // this will trigger a re-render filling in the the headers
  // part with our updated auth state.
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "/graphql",
      headers: token ? { authorization: token } : undefined,
    }),
  });

  return <Provider client={client}>{children}</Provider>;
}
