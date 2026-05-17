import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount/VerifyAccount";
import WelcomeComponent from "../pages/WelcomeComponent/WelcomeComponent";
import NotFound from "../shared/NotFound/NotFound";
import AuthLayout from "../shared/layouts/AuthLayout/AuthLayout";
import MasterLayout from "../shared/layouts/MasterLayout/MasterLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Users from "../pages/Users/Users";
import Projects from "../pages/Projects/Projects";
import Tasks from "../pages/Tasks/Tasks";
// import ProtectedRoute from "./ProtectedRoutes";

// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />,
//     errorElement: <NotFound />,
//   },
//   {
//     index: true,
//     element: <Login />,
//   },
//   {
//     path: "login",
//     element: <Login />,
//   },
//   {
//     path: "register",
//     element: <Register />,
//   },
//   {
//     path: "verify-account",
//     element: <VerifyAccount />,
//   },
//   {
//     path: "forget-password",
//     element: <ForgetPassword />,
//   },
//   {
//     path: "change-password",
//     element: <ChangePassword />,
//   },
//   {
//     path: "reset-password",
//     element: <ResetPassword />,
//   },
//   {
//     path: "navbar",
//     element: <Navbar />,
//   },
// ]);
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
      { path: "users", element: <Users /> },
      { path: "projects", element: <Projects /> },
      { path: "tasks", element: <Tasks /> },
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
