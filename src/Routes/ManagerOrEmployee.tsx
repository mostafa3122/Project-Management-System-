import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { userContext } from "../context/userContext";

const ManagerOrEmployee = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const { userData } = useContext(userContext) || {};

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  const role = userData.group?.name;

 const path = pathname.replace("/dashboard/", "");

 

  const accessMap: Record<string, string[]> = {
    Manager: ["users", "projects", "tasks"],
      Employee: ["projects","tasks/task-board", ],

  };

  const allowedRoutes = accessMap[role || ""] || [];

  if(!allowedRoutes.some((route) => path.startsWith(route))) {
    return <Navigate to="/no-data" replace />;
  }

  return <>{children}</>;
};

export default ManagerOrEmployee;
