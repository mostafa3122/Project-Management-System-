import { useContext, useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.svg";
import { FaBell } from "react-icons/fa";
import user from "../../assets/user-image.jpg";
import { userContext } from "../../context/userContext";
import { GoChevronDown } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import ProfileModal from "../ProfileModal/ProfileModal";

// Icons
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconUser = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconLock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { userData, setUserToken } = useContext(userContext) || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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

  const avatarSrc = userData?.imagePath
    ? `https://upskilling-egypt.com:3003/${userData.imagePath}`
    : user;

  return (
    <>
      <nav className="flex items-center justify-between bg-white px-4 sm:px-6 md:px-8 py-2.5 shadow-sm border-b border-gray-100 sticky top-0 z-30">

        {/* ── Left: hamburger + logo ── */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              className="md:hidden flex items-center justify-center w-8 h-8 text-[#0E382F] rounded-lg hover:bg-[#f0f9f6] transition-colors"
              aria-label="Open menu"
            >
              <IconMenu />
            </button>
          )}
          <img src={logo} alt="PMS Logo" className="h-8 sm:h-9 md:h-10 w-auto" />
        </div>

        {/* ── Right: bell + divider + user ── */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Bell */}
          <button className="relative p-1.5 rounded-xl hover:bg-amber-50 transition-colors group" aria-label="Notifications">
            <FaBell className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#EF9B28] group-hover:scale-110 transition-transform" />
            <span className="absolute top-0.5 right-0.5 flex h-[14px] w-[14px] sm:h-4 sm:w-4 items-center justify-center rounded-full bg-[#EF9B28] text-[8px] sm:text-[9px] font-bold text-white border-[1.5px] border-white">
              1
            </span>
          </button>

          {/* Divider */}
          <div className="h-7 w-px bg-gray-200 hidden sm:block" />

          {/* User dropdown trigger */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 sm:gap-2.5 rounded-xl px-2 py-1.5 hover:bg-gray-50 transition-colors focus:outline-none group"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <img
                  src={avatarSrc}
                  alt="User Avatar"
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover ring-2 ring-[#EF9B28]/30"
                />
                {/* Online dot */}
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />
              </div>

              {/* Name + email (md+) */}
              <div className="hidden md:flex flex-col text-left min-w-0 max-w-[160px]">
                <span className="text-sm font-semibold text-[#003d29] leading-tight truncate">
                  {userData?.userName ?? <BiLoaderCircle className="animate-spin inline" />}
                </span>
                <span className="text-[11px] text-gray-400 truncate">
                  {userData?.email ?? <BiLoaderCircle className="animate-spin inline" />}
                </span>
              </div>

              <GoChevronDown
                className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* ── Dropdown menu ── */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 z-50 mt-2 w-64 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden"
                style={{ animation: "dropdownIn 0.18s cubic-bezier(0.22,1,0.36,1) both" }}
              >
                {/* Profile header inside dropdown */}
                <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#f0f9f6] to-[#fdf6ed] border-b border-gray-100">
                  <img
                    src={avatarSrc}
                    alt="User Avatar"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-[#EF9B28]/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#003d29] truncate">
                      {userData?.userName ?? "—"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">
                      {userData?.email ?? "—"}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1.5">
                  <DropdownItem
                    icon={<IconUser />}
                    label="My Profile"
                    onClick={() => { setIsDropdownOpen(false); setIsModalOpen(true); }}
                  />
                  <DropdownItem
                    icon={<IconLock />}
                    label="Change Password"
                    onClick={() => { setIsDropdownOpen(false); navigate("/change-password"); }}
                  />
                </div>

                <div className="border-t border-gray-100 py-1.5">
                  <DropdownItem
                    icon={<IconLogout />}
                    label="Logout"
                    onClick={handleLogout}
                    danger
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Animation keyframes */}
      <style>{`
        @keyframes dropdownIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
      `}</style>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

// ── Reusable dropdown item ──
function DropdownItem({
  icon, label, onClick, danger = false,
}: {
  icon: React.ReactNode; label: string; onClick: () => void; danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-colors text-left
        ${danger
          ? "text-red-500 hover:bg-red-50 hover:text-red-600"
          : "text-gray-700 hover:bg-[#f0f9f6] hover:text-[#003d29]"}
      `}
    >
      <span className={`shrink-0 ${danger ? "text-red-400" : "text-[#315951]"}`}>
        {icon}
      </span>
      {label}
    </button>
  );
}