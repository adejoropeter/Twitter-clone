import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const currentUser = useSelector((state) => state.login.currentUser);
  return currentUser ? <Outlet /> : <Navigate to={`explore`} />;
};

export default ProtectedRoute;
