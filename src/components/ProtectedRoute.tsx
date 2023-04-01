import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";
import React from "react";
import App from "../App";

interface Props {
  children?: React.ReactElement;
}

const ProtectedRoute = () => {
  if (!localStorage.getItem("user")) {
    return <Navigate to="/login" />;
  }
  return <App />;
};

export default ProtectedRoute;
