import { BiTrash } from "react-icons/bi";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

export default function DeleteConfirmation({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  loading = false,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-100 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative animate-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center">
          {/* Warning Icon */}
          <div className="w-16 h-16 bg-[#FDF2F2] rounded-full flex items-center justify-center mb-4 text-[#EF4444]">
            <BiTrash size={32} />
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2 font-montserrat">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mb-6 font-montserrat">
            {message}
          </p>

          <div className="flex items-center gap-4 w-full">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-montserrat animate-pulse-hover"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 py-3 px-4 bg-[#EF4444] hover:bg-[#DC2626] disabled:bg-red-400 text-white rounded-full text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer font-montserrat"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
