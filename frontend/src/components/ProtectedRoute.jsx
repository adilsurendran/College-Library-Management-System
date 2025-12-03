

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log("ProtectedRoute check:", { user, loading });


  // ⭐ Wait for AuthContext to finish loading (no redirect too early)
  if (loading) return null; // or a spinner

  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
