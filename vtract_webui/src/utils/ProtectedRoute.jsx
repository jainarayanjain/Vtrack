import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks";
import { Browser } from "../constants";

const ProtectedRoute = ({ children }) => {
  const user = useAppSelector((state) => state.auth);
  console.log(user, "this is a protected route--->");
  let location = useLocation();

  if (!user.isLoggedIn) {
    return <Navigate to={Browser.LOGIN} state={{ from: location }} replace />
  }
  return children;
};

export default ProtectedRoute;
