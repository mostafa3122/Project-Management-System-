import { Navigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { userToken } = useContext(userContext) || {};
  if (localStorage.getItem("token") || userToken) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
