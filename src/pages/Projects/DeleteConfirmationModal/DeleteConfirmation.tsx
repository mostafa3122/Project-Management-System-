
import { BiTrash, BiLogOut, BiBlock } from "react-icons/bi";
import type { ReactNode } from "react";

type ConfirmVariant = "delete" | "logout" | "block" | "custom";

const variantConfig = {
  delete: {
    icon: <BiTrash size={32} />,
    iconBg: "bg-[#FDF2F2]",
    iconColor: "text-[#EF4444]",
    confirmBg: "bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-red-400",
    confirmLabel: "Delete",
    title: "Delete Item",
    message:
      "Are you sure you want to delete this item? This action cannot be undone.",
  },
  logout: {
    icon: <BiLogOut size={32} />,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "text-[#EF9B28]",
    confirmBg: "bg-[#EF9B28] hover:bg-[#d98a20] disabled:bg-orange-300",
    confirmLabel: "Logout",
    title: "Logout",
    message: "Are you sure you want to logout?",
  },
  block: {
    icon: <BiBlock size={32} />,
    iconBg: "bg-[#F0F0F0]",
    iconColor: "text-[#4F4F4F]",
    confirmBg: "bg-[#4F4F4F] hover:bg-[#333] disabled:bg-gray-400",
    confirmLabel: "Block",
    title: "Block User",
    message: "Are you sure you want to block this user?",
  },
  custom: {
    icon: null,
    iconBg: "",
    iconColor: "",
    confirmBg: "bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-red-400",
    confirmLabel: "Confirm",
    title: "Are you sure?",
    message: "",
  },
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  variant?: ConfirmVariant;
  loading?: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  icon?: ReactNode;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  variant = "custom",
  loading = false,
  title,
  message,
  confirmLabel,
  icon,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  const config = variantConfig[variant];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          <div
            className={`w-16 h-16 ${config.iconBg} rounded-full flex items-center justify-center mb-4 ${config.iconColor}`}
          >
            {icon ?? config.icon}
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-montserrat">
            {title ?? config.title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 font-montserrat">
            {message ?? config.message}
          </p>

          <div className="flex items-center gap-4 w-full">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-montserrat"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 py-3 px-4 ${config.confirmBg} text-white rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer font-montserrat`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                confirmLabel ?? config.confirmLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
