import React, { useContext } from 'react';
import { userContext } from '../../context/userContext';
import { FiUser, FiMail, FiPhone, FiLock, FiLogOut, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userImg from '../../assets/user-image.jpg';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { userData, setUserToken } = useContext(userContext) || {};
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    if (setUserToken) {
      setUserToken(null);
      toast.success("Logged out successfully");
      navigate("/login");
    }
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const user = userData as any;

  return (
    <div 
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-4 overflow-hidden rounded-4xl bg-[#0E382F] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-black/20 p-2 text-white hover:bg-black/40 transition-colors cursor-pointer"
        >
          <FiX className="w-5 h-5" />
        </button>

        <div 
          className="h-24 w-full"
          style={{
            background:'repeating-linear-gradient(-45deg, rgba(239, 155, 40, 0.8), rgba(239, 155, 40, 0.8) 10px, rgba(210, 131, 24, 0.8) 10px, rgba(210, 131, 24, 0.8) 20px)'
          }}
        ></div>

        <div className="px-8 pb-8 pt-0 flex flex-col items-center">
         
          <div className="relative -mt-16 mb-3">
            <div className="h-24 w-24 rounded-full border-[6px] border-[#0E382F] bg-[#EF9B28] flex items-center justify-center overflow-hidden shadow-lg">
              {userData?.imagePath || user?.profileImage ? (
                <img 
                  src={userData?.imagePath || user?.profileImage || userImg} 
                  alt="User Avatar" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-5xl font-bold text-white uppercase">
                  {userData?.userName?.charAt(0) || 'U'}
                </span>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-1">
            {userData?.userName || 'User Name'}
          </h2>
          
          <div className="mb-6 rounded-full border border-[#EF9B28] bg-[#154A3E] px-6 py-1">
            <span className="text-sm font-medium text-[#EF9B28]">
              {user?.role || user?.group?.name || 'System User'}
            </span>
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center gap-4 rounded-xl bg-[#0B2C25] p-3.5 border border-white/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                <FiUser className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Username</span>
                <span className="text-sm font-medium text-white">{userData?.userName || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#0B2C25] p-3.5 border border-white/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                <FiMail className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Email</span>
                <span className="text-sm font-medium text-white">{userData?.email || 'N/A'}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl bg-[#0B2C25] p-3.5 border border-white/5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0E382F] text-[#EF9B28]">
                <FiPhone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Phone</span>
                <span className="text-sm font-medium text-white">{user?.phoneNumber || '+20 100 000 0000'}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 w-full space-y-3">
            <button 
              onClick={() => {
                onClose();
                navigate("/change-password");
              }}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#EF9B28] bg-transparent py-3 text-sm font-semibold text-[#EF9B28] transition-all hover:bg-[#EF9B28] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF9B28] focus:ring-offset-2 focus:ring-offset-[#0E382F]"
            >
              <FiLock className="h-4 w-4" />
              Change Password
            </button>
            <button 
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#C85D5D] bg-transparent py-3 text-sm font-semibold text-[#C85D5D] transition-all hover:bg-[#C85D5D] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#C85D5D] focus:ring-offset-2 focus:ring-offset-[#0E382F]"
            >
              <FiLogOut className="h-4 w-4" />
              Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
