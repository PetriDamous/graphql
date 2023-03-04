import React from "react";

export const AuthContext = React.createContext();
const Provider = AuthContext.Provider;

export function AuthProvider({ children }) {
  // We can use this to set when a user has authenticated after
  // a succesful sign in.
  const [authInfo, setAuthInfo] = React.useState({
    token: null,
    userData: {},
  });

  // We can use this boolean to check if a user has
  // been authenticated or not.
  // Comes in handy if you want to block access to certain parts
  // of your app from un-authenticated users.
  const isAuthenticated = () => authInfo.token !== null;

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo }}>
      {children}
    </Provider>
  );
}
