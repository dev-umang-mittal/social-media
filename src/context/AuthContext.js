import React, { useState } from "react";

const AuthContext = React.createContext();

const AuthState = (props) => {
  const [user, setUser] = useState({ username: "Umang" });
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
