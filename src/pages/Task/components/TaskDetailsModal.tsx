import {
  BiClipboard,
  BiX,
  BiFolderOpen,
  BiCalendar,
  BiInfoCircle,
  BiEdit,
} from "react-icons/bi";
import type { ITask } from "../../../interfaces/task.interface";
import StatusBadge from "../../../shared/StatusBadge/StatusBadge";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: ITask | null;
  onEdit?: () => void;
}

export default function TaskDetailsModal({
  isOpen,
  onClose,
  task,
  onEdit,
}: TaskDetailsModalProps) {
  if (!isOpen || !task) return null;



  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Block */}
        <div className="bg-[#315951E5] px-6 py-5 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="bg-[#EF9B28] p-3 rounded-xl flex items-center justify-center shadow-md">
              <BiClipboard size={22} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] tracking-wider text-gray-400 font-bold uppercase font-montserrat">
                Task Details
              </p>
              <h2 className="text-lg font-semibold font-quicksand mt-0.5">
                {task.title}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer"
          >
            <BiX size={22} />
          </button>
        </div>

        {/* Body Block */}
        <div className="p-6 font-quicksand space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F9F9F6] border border-[#ECECE8] rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Status
              </span>
              <div className="mt-2">
                <StatusBadge status={task.status} />
              </div>
            </div>

            <div className="bg-[#F9F9F6] border border-[#ECECE8] rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Project
              </span>
              <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black">
                <BiFolderOpen className="text-[#EF9B28]" size={18} />
                <span>{task.project?.title || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#F9F9F6] border border-[#ECECE8] rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Assigned To
              </span>
              <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black">
                <div className="w-7 h-7 bg-[#1F2633] text-white flex items-center justify-center rounded-full text-xs font-bold font-montserrat">
                  {task.employee?.userName
                    ? task.employee.userName.substring(0, 2).toUpperCase()
                    : "UN"}
                </div>
                <span>{task.employee?.userName || "Unassigned"}</span>
              </div>
            </div>

            <div className="bg-[#F9F9F6] border border-[#ECECE8] rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Date Created
              </span>
              <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black">
                <BiCalendar className="text-[#EF9B28]" size={18} />
                <span>
                  {task.creationDate
                    ? new Date(task.creationDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })
                        .replace(/\//g, "-")
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Description
            </span>
            <div className="bg-[#F9F9F6] border border-[#ECECE8] rounded-2xl p-4 min-h-[80px] text-sm text-gray-700 leading-relaxed">
              {task.description || "No description provided."}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-normal">
              <BiInfoCircle size={16} />
              <span>
                Created on{" "}
                {task.creationDate
                  ? new Date(task.creationDate).toLocaleDateString("en-US")
                  : "N/A"}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {onEdit && (
                <button
                  onClick={onEdit}
                  className="px-6 py-2 border border-gray-300 hover:bg-gray-50 transition-colors rounded-full text-xs font-semibold text-gray-700 cursor-pointer flex items-center gap-1.5 font-montserrat"
                >
                  <BiEdit size={14} className="text-gray-500" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
