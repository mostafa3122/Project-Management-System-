import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WelcomeComponent from "../pages/WelcomeComponent/WelcomeComponent";
import NotFound from "../pages/NotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import VerifyAccount from "../pages/Auth/VerifyAccount/VerifyAccount";
import ForgetPassword from "../pages/Auth/ForgetPassword/ForgetPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
// import ProtectedRoute from "./ProtectedRoutes";



const routes = createBrowserRouter([
  {
    path: "/",
    element: <WelcomeComponent />,
    errorElement: <NotFound />,
  },
  {
    index: true,
    element: <WelcomeComponent />,
  },
  {
    path: "login",
    element:<Login /> ,
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
    path: "reset-password",
    element: <ResetPassword />,
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

const Routes = ()=>{
    return (
        <>
        <RouterProvider router={routes} />
        </>
        

    )
}

export default Routes;