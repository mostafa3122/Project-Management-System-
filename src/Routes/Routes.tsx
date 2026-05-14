import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ChangePassword from "../pages/Auth/ChangePassword/ChangePassword";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import VerifyAccount from "../pages/Auth/VerifyAccount/VerifyAccount";
import NotFound from "../pages/NotFound";
import WelcomeComponent from "../pages/WelcomeComponent/WelcomeComponent";
import Navbar from "../shared/Navbar/Navbar";
// import ProtectedRoute from "./ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    index: true,
    element: <Login />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
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
    path: "change-password",
    element: <ChangePassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "navbar",
    element: <Navbar />,
  },
]);
// const routes = createBrowserRouter([
//     {
//         path: "/",
//         element: <WelcomeComponent />,
//         errorElement: <NotFound />,
//         children: [
//             {
//                 index: true,
//                 element: <WelcomeComponent/>
//             },
//             {
//                path:'login',
//                element:<Login/>
//             },
//             {
//                path:'register',
//                element:<Register/>
//             },
//             {
//                 path :'verify-account',
//                 element : <VerifyAccount/>
//             },
//             {
//                 path :'forget-password',
//                 element : <ForgetPassword/>
//             },
//             {
//                 path :'reset-password',
//                 element : <ResetPassword/>
//             }
//         ]
//     }

// ])

const Routes = () => {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
};

export default Routes;
