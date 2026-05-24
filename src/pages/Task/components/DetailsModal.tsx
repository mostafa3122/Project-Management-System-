// DetailsModal.tsx
import {
  BiX,
  BiClipboard,
  BiFolderOpen,
  BiCalendar,
  BiInfoCircle,
  BiEdit,
  BiTask,
} from "react-icons/bi";
import StatusBadge from "../../../shared/StatusBadge/StatusBadge";


type ModalVariant = "task" | "project";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit?: () => void;
  variant: ModalVariant;
}
interface TaskModalProps extends BaseModalProps {
  variant: "task";
  data: {
    title: string;
    status?: string;
    employee?: { userName: string };
    project?: { title: string };
    creationDate?: string;
    description?: string;
  } | null;
}

interface ProjectModalProps extends BaseModalProps {
  variant: "project";
  data: {
    title: string; // ← optional
    status?: string;
    task?: any[];
    creationDate?: string;
    description?: string;
  } | null;
}

type DetailsModalProps = TaskModalProps | ProjectModalProps;

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString)
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

export default function DetailsModal({
  isOpen,
  onClose,
  onEdit,
  variant,
  data,
}: DetailsModalProps) {
  if (!isOpen || !data) return null;

  const isTask = variant === "task";
  const taskData = isTask ? (data as TaskModalProps["data"]) : null;
  const projectData = !isTask ? (data as ProjectModalProps["data"]) : null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#315951] px-6 py-5 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="bg-[#EF9B28] p-3 rounded-xl flex items-center justify-center shadow-md">
              {isTask ? (
                <BiClipboard size={22} className="text-white" />
              ) : (
                <BiFolderOpen size={22} className="text-white" />
              )}
            </div>
            <div>
              <p className="text-[10px] tracking-wider text-gray-400 dark:text-gray-300 font-bold uppercase font-montserrat">
                {isTask ? "Task Details" : "Project Details"}
              </p>
              <h2 className="text-lg font-semibold font-quicksand mt-0.5">
                {data.title}
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

        <div className="p-6 font-quicksand space-y-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status */}
            <div className="bg-[#F9F9F6] dark:bg-slate-900 border border-[#ECECE8] dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Status
              </span>
              <div className="mt-2">
                <StatusBadge status={data.status || (variant === "project" ? "Public" : "")} />
              </div>
            </div>

            <div className="bg-[#F9F9F6] dark:bg-slate-900 border border-[#ECECE8] dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              {isTask ? (
                <>
                  <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </span>
                  <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black dark:text-white">
                    <BiFolderOpen className="text-[#EF9B28]" size={18} />
                    <span>{taskData?.project?.title || "N/A"}</span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                    Num Tasks
                  </span>
                  <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black dark:text-white">
                    <BiTask className="text-[#EF9B28]" size={18} />
                    <span>
                      {Array.isArray(projectData?.task)
                        ? projectData.task.length
                        : "N/A"}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {isTask && (
              <div className="bg-[#F9F9F6] dark:bg-slate-900 border border-[#ECECE8] dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
                <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                  Assigned To
                </span>
                <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black dark:text-white">
                  <div className="w-7 h-7 bg-[#1F2633] dark:bg-slate-700 text-white flex items-center justify-center rounded-full text-xs font-bold font-montserrat">
                    {taskData?.employee?.userName
                      ? taskData.employee.userName.substring(0, 2).toUpperCase()
                      : "UN"}
                  </div>
                  <span>{taskData?.employee?.userName || "Unassigned"}</span>
                </div>
              </div>
            )}

            <div className="bg-[#F9F9F6] dark:bg-slate-900 border border-[#ECECE8] dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between min-h-[90px]">
              <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider">
                Date Created
              </span>
              <div className="flex items-center gap-2 mt-2 text-sm font-semibold text-black dark:text-white">
                <BiCalendar className="text-[#EF9B28]" size={18} />
                <span>{formatDate(data.creationDate)}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-400 uppercase tracking-wider block mb-2">
              Description
            </span>
            <div className="bg-[#F9F9F6] dark:bg-slate-900 border border-[#ECECE8] dark:border-slate-700 rounded-2xl p-4 min-h-[80px] text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.description || "No description provided."}
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-700 pt-5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 font-normal">
              <BiInfoCircle size={16} />
              <span>Created on {formatDate(data.creationDate)}</span>
            </div>
            {onEdit && (
              <button
                onClick={onEdit}
                className="px-6 py-2 border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors rounded-full text-xs font-semibold cursor-pointer flex items-center gap-1.5 font-montserrat"
              >
                <BiEdit size={14} className="text-gray-500 dark:text-gray-400" />
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
