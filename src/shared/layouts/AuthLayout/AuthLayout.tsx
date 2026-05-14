import { Outlet, useLocation } from "react-router-dom";
import authLogo from "../../../assets/PMS3.png";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import { motion, AnimatePresence } from "framer-motion";

const pageTitles: Record<string, string> = {
  "/login":           "Login",
  // "/register":        "Create New Account",
  "/verify-account":  "Verify Account",
  "/forget-password": "Forget Password",
  "/reset-password":  "Reset Password",
  "/change-password": "Change Password",
};

// Logo drops in from above on mount
const logoVariants = {
  hidden:  { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
 
// Card scales up and fades in on mount
const cardVariants = {
  hidden:  { opacity: 0, scale: 0.94, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.15 },
  },
};
 
// Page outlet slides + fades when the route changes
const pageVariants = {
  initial: { opacity: 0, x: 32 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};
 
// Title fades + slides up when the pathname changes
const titleVariants = {
  initial: { opacity: 0, y: 10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};
 
export default function AuthLayout() {
  const { pathname } = useLocation();

  const title = pageTitles[pathname] ?? "Login";

  return (
    <div className="h-screen register-bg flex justify-center items-center">
      <div className="w-11/12 md:w-1/2 lg:w-5/12 flex flex-col items-center">

        {/* Logo */}
         <motion.div
          className="auth-logo mb-5"
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <img src={authLogo} alt="PMS logo" className="w-32 md:w-48" />
        </motion.div>

        {/* Card */}
         <motion.div
          className="w-full p-6 sm:p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title — animates every time pathname changes */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname + "-title"}
              variants={titleVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <AuthHeader title={title} />
            </motion.div>
          </AnimatePresence>
 
          {/* Page content — slides in/out on every route change */}
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}