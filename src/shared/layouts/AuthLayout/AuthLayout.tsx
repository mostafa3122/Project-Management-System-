import { Outlet, useLocation } from "react-router-dom";
import authLogo from "../../../assets/PMS3.png";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";

const pageTitles: Record<string, string> = {
  "/login":           "Login",
  // "/register":        "Create New Account",
  "/verify-account":  "Verify Account",
  "/forget-password": "Forget Password",
  "/reset-password":  "Reset Password",
  "/change-password": "Change Password",
};

export default function AuthLayout() {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? "Login";

  return (
    <div className="h-screen register-bg flex justify-center items-center">
      <div className="w-11/12 md:w-1/2 lg:w-5/12 flex flex-col items-center">

        {/* Logo */}
        <div className="auth-logo mb-5">
          <img src={authLogo} alt="PMS logo" className="w-32 md:w-48" />
        </div>

        {/* Card */}
        <div className="w-full p-6 sm:p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl">

          {/* Header — title switches automatically with the route */}
          <AuthHeader title={title} />

          <Outlet />
        </div>

      </div>
    </div>
  );
}