import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";
import { motion, AnimatePresence } from "framer-motion";

export default function MasterLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar — passes burger handler for mobile */}
      <div className="shrink-0">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Desktop sidebar — hidden on mobile */}
        <div className="hidden md:block relative z-50 bg-[#0E382F] text-white shrink-0 h-full">
          <SideBar />
        </div>

<<<<<<< HEAD
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-200">
=======
        {/* Mobile backdrop */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full z-50 bg-[#0E382F] text-white md:hidden shadow-2xl"
            >
              <SideBar onClose={() => setMobileOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-gray-100">
>>>>>>> 09770a1a1944477ce6fb8dc027d1a0998c43c066
          <Outlet />
        </div>
      </div>
    </div>
  );
}
