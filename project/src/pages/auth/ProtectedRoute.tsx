import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  authToken: string | null;
  children: any;
}

export function ProtectedRoute({ authToken, children }: ProtectedRouteProps) {
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
}