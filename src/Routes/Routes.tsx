import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount/VerifyAccount";
import Dashboard from "../pages/Dashboard/Dashboard";
import WelcomeComponent from "../pages/WelcomeComponent/WelcomeComponent";
import AuthLayout from "../shared/layouts/AuthLayout/AuthLayout";
import MasterLayout from "../shared/layouts/MasterLayout/MasterLayout";
import NotFound from "../shared/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import UserList from "../pages/Users/UsersList/UserList";
import TaskList from "../pages/Task/TaskList";
import TaskData from "../pages/Task/TaskData/TaskData";
import ProjectList from "../pages/Projects/ProjectList/ProjectList";
import ProjectForm from "../pages/Projects/ProjectForm/ProjectForm";
import ManagerOrEmployee from "./ManagerOrEmployee";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "verify-account",
        element: <VerifyAccount />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
    ],
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MasterLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "", element: <Dashboard /> },
      {
        path: "users",
        element: (
          <ManagerOrEmployee>
            <UserList />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "projects",
        element: (
          <ManagerOrEmployee>
            <ProjectList />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "projects/add",
        element: (
          <ManagerOrEmployee>
            <ProjectForm />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "projects/edit/:id",
        element: (
          <ManagerOrEmployee>
            <ProjectForm />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "projects/view/:id",
        element: (
          <ManagerOrEmployee>
            <ProjectForm />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "tasks",
        element: (
          <ManagerOrEmployee>
            <TaskList />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "tasks/new",
        element: (
          <ManagerOrEmployee>
            <TaskData />
          </ManagerOrEmployee>
        ),
      },
      {
        path: "tasks/edit/:id",
        element: (
          <ManagerOrEmployee>
            <TaskData />
          </ManagerOrEmployee>
        ),
      },
    ],
  },
  { path: "welcome", element: <WelcomeComponent /> },
]);

const Routes = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default Routes;
