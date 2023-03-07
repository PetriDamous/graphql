import React, { useContext, useState, createContext } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, userObj: {} });

  const isAuthenticated = auth.token ? true : false;

  console.log(auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
