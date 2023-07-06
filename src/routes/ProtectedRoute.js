import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const currentUser = useSelector((state) => state.login.currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/explore" />;
};

export default ProtectedRoute;
