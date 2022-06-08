import React from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

interface props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<props> = ({ children }) => {
  const { user } = UserAuth();

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectedRoute;
