import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import useErrorHandler from "./customHooks/useErrorHandler";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const errorHandler = useErrorHandler();

  if (!user) {
    errorHandler({ code: 2 });
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
