import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";
export default function MasterLayout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Navbar */}
      <div className="shrink-0">
        <Navbar />
      </div>
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* SideBar */}
        <div className="bg-[#0E382F] w-64 text-white p-3 shrink-0 h-full overflow-y-auto">
          <SideBar />
        </div>
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-2 bg-gray-300">
          <Outlet />
        </div>
      </div>
    </div>
  );
}