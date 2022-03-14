import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthState = (props) => {
  const [user, setUser] = useState();
  const [isAuthenticated, setAuthenticationStatus] = useState(false);
  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setAuthenticationStatus }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthState };
