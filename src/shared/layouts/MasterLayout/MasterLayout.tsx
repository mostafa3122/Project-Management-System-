import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

export default function MasterLayout() {
  const { theme } = useContext(ThemeContext) || {};

  return (
    <div className={`flex flex-col h-screen overflow-hidden bg-white transition-colors duration-200 ${theme === "dark" ? "dark bg-slate-900 text-white" : ""}`}>
      {/* Navbar */}
      <div className="shrink-0">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* SideBar — no overflow-hidden, high z-index so button protrudes above page */}
        <div className="relative z-50 bg-[#0E382F] text-white shrink-0 h-full">
          <SideBar />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto  bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
