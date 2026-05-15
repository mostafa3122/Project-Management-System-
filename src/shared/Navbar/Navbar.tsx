import { useContext, useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.svg";
import { FaBell } from "react-icons/fa";
import user from "../../assets/user-image.jpg"
import { userContext } from "../../context/userContext";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import ProfileModal from "../ProfileModal/ProfileModal";

export default function Navbar() {
  const { userData, setUserToken } = useContext(userContext) || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (setUserToken) {
      setUserToken(null);
      toast.success("Logged out successfully");
      navigate("/login");
    }
    setIsDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between bg-white px-6 py-2 shadow-sm border-b border-gray-100">
        <img src={logo} alt="PMS Logo" className="h-10 w-auto" />
  
      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer">
          <FaBell className="w-7 h-7 text-[#EF9B28]" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EF9B28] text-[10px] font-bold text-white border-2 border-white">
            1</span>
        </div>
        <div className="h-10 w-px bg-gray-200"></div>
        <div className="relative inline-block text-left" ref={dropdownRef}>
          <button 
            type="button"
            className="flex items-center gap-3 cursor-pointer bg-transparent border-none focus:outline-none w-full justify-center"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={userData?.imagePath || user}
              alt="User Avatar"
              className="h-10 w-10 rounded-full object-cover border border-gray-200"
            />
            <div className="hidden md:flex flex-col text-left">
              <span className="text-sm font-semibold text-[#003d29]">
                {userData?.userName || <BiLoaderCircle className="animate-spin" />}
              </span>
              <span className="text-xs text-gray-500">
                {userData?.email || <BiLoaderCircle className="animate-spin" />}
              </span>
            </div>
            <GoChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}/>
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">

              <div className="py-1">
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  My Profile
                </button> 
                <button onClick={() => navigate("/change-password")} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  Change Password
                </button>
                <hr className="my-1 border-gray-200" />
                <button 
                  type="button"
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
}
