import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SkeletonLayout from "./SkeletonLayout";

const ProtectedRoute: React.FC = () => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return <SkeletonLayout />;
  }

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
