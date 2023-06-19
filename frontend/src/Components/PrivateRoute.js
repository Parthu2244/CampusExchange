import React from "react";
import { Route, Navigate } from "react-router-dom";
import Check from "./Check";
// A component that checks for authentication and redirects to login if needed
const PrivateRoute = ({ children }) => {
  // Use the checkAuth function to check if the user is authenticated
  const isAuthenticated = Check();

  // If the user is authenticated, render the children components
  if (isAuthenticated) {
    return children;
  }

  // Otherwise, redirect to the login page
  return <Navigate to="/login" />;
};

export default PrivateRoute;
