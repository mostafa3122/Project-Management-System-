import {
  BiPlus,
  BiSearch,
  BiDotsHorizontalRounded,
  BiShow,
  BiEdit,
  BiTrash,
  BiFilter,
} from "react-icons/bi";
import { LuChevronsUpDown } from "react-icons/lu";
import { DeleteTask, GetAllTasks } from "../../services/api/tasks";
import { useEffect, useState } from "react";
import type { ITask } from "../../interfaces/task.interface";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { toast } from "react-toastify";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../../shared/DeleteConfirmation/DeleteConfirmation";
import TaskDetailsModal from "./components/TaskDetailsModal";
import StatusBadge from "../../shared/StatusBadge/StatusBadge";

const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date
    .toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");
};

export default function TaskList() {
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTitle, setSearchTitle] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const handleOutsideClick = () => {
      setActiveDropdownId(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchTasksData = async () => {
      try {
        setLoading(true);
        const response = await GetAllTasks({
          pageNumber: pageNumber,
          pageSize: pageSize,
          title: debouncedSearchTitle || undefined,
        });
        setTasksList(response.data.data || []);
        console.log(response.data.data);

        setTotalRecords(response.data.totalNumberOfRecords || 0);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasksData();
  }, [pageNumber, pageSize, debouncedSearchTitle]);

  const handleDeleteConfirm = async () => {
    if (taskToDelete === null) return;
    try {
      setDeleteLoading(true);
      await DeleteTask(taskToDelete);
      setTasksList((prev) => prev.filter((item) => item.id !== taskToDelete));
      toast.success("Task deleted successfully!");
      setIsDeleteModalOpen(false);
      setTaskToDelete(null);
      setPageNumber(1);
    } catch (error: any) {
      toast.error(error?.message || "Failed to delete task");
    } finally {
      setDeleteLoading(false);
    }
  };
  /* Search Debounce */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTitle(searchTitle);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTitle]);

  return (
    <>
      <div className="bg-white flex justify-between items-center py-2 mb-6 font-montserrat">
        <h1 className="px-6 py-4 text-[#4F4F4F] font-medium text-[28px] ">
          Tasks
        </h1>
        <button
          onClick={() => navigate("/dashboard/tasks/new")}
          className="text-white bg-[#EF9B28] hover:bg-[#d98a20] px-6 py-3 rounded-full font-normal text-sm font-montserrat flex items-center gap-2 mx-6 transition-colors shadow-sm cursor-pointer"
        >
          <BiPlus size={20} /> Add New Task
        </button>
      </div>

      <div className="bg-white rounded-xl border border-[#F1F5F9] shadow-[0px_4px_20px_0px_#0000000D] mx-auto max-w-6xl">
        <div className="flex items-center gap-2 p-4">
          <div className="relative flex items-center">
            <BiSearch className="absolute left-4 text-[#4F4F4F]" size={20} />
            <input
              value={searchTitle}
              onChange={(e) => {
                setSearchTitle(e.target.value);
                setPageNumber(1);
              }}
              type="text"
              placeholder="Search Tasks"
              className="pl-12 pr-6 py-2.5 w-72 border-[0.7px] border-solid border-[#26385A40] rounded-full text-sm text-[#AAAAAA]  placeholder-gray-400 focus:outline-none focus:border-[#315951] focus:ring-1 focus:ring-[#315951] transition-all bg-white"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer font-montserrat animate-pulse-hover">
            <BiFilter size={18} className="text-gray-500" />
            <span>Filter</span>
          </button>
        </div>

        <div className="w-full overflow-visible">
          <table className="w-full border-collapse table-auto responsive">
            <thead>
              <tr className="bg-[#315951E5] text-white text-left font-montserrat text-sm font-semibold divide-x divide-[#315951E5] border border-[#315951E5]">
                <th className="px-6 py-2 font-normal w-1/4">
                  <div className="flex items-center justify-between gap-2">
                    <span>Title</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center justify-between gap-2">
                    <span>Statuses</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center justify-between gap-2">
                    <span>User</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center justify-between gap-2">
                    <span>Project</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center justify-between gap-2">
                    <span>Date Created</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm text-[#4F4F4F] text-normal">
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div className="w-10 h-10 border-4 border-[#315951]/20 border-t-[#315951] rounded-full animate-spin"></div>
                      <p className="text-[#315951] font-montserrat font-medium text-sm">
                        Loading tasks...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : tasksList?.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-10 text-gray-500 font-montserrat"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasksList.map((task, index) => (
                  <tr
                    className="odd:bg-white even:bg-[#F8F9FA] hover:bg-gray-100/70 transition-colors"
                    key={task?.id ?? index}
                  >
                    <td className="px-6 py-2 w-1/4 ">{task?.title}</td>
                    <td className="px-6 py-2 w-1/6 ">
                      <StatusBadge status={task?.status || ""} />
                    </td>
                    <td className="px-6 py-2 w-1/6">
                      {task?.employee?.userName || "Unassigned"}
                    </td>
                    <td className="px-6 py-2 w-1/6">
                      {task?.project?.title || "N/A"}
                    </td>
                    <td className="px-6 py-2 w-1/6">
                      {formatDate(task?.creationDate)}
                    </td>
                    <td className="px-6 py-2 w-12 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (task?.id !== undefined) {
                            setActiveDropdownId(
                              activeDropdownId === task.id ? null : task.id,
                            );
                          }
                        }}
                        className="text-[#0E382F] hover:bg-[#0E382F]/10 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center cursor-pointer"
                      >
                        <BiDotsHorizontalRounded size={20} />
                      </button>

                      {activeDropdownId === task?.id &&
                        task?.id !== undefined && (
                          <div className="absolute right-4 top-12 w-32 bg-white rounded-2xl shadow-[0px_4px_20px_0px_#00000015] border border-[#F1F5F9] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 font-montserrat">
                            <div className="absolute -top-1.5 left-20 w-3 h-3 bg-white border-t border-l border-[#F1F5F9] rotate-45 z-0"></div>

                            <div className="relative z-10">
                              <button
                                onClick={() => {
                                  setSelectedTask(task);
                                  setIsViewModalOpen(true);
                                  setActiveDropdownId(null);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-[#26385A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              >
                                <BiShow className="text-[#0E382F]" size={18} />
                                <span>View</span>
                              </button>

                              <button
                                onClick={() => {
                                  navigate(`/dashboard/tasks/edit/${task.id}`);
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-[#26385A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              >
                                <BiEdit className="text-[#0E382F]" size={18} />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (task?.id !== undefined) {
                                    setTaskToDelete(task.id);
                                    setIsDeleteModalOpen(true);
                                    setActiveDropdownId(null);
                                  }
                                }}
                                className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-[#26385A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                              >
                                <BiTrash className="text-[#0E382F]" size={18} />
                                <span>Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/*pagination ui*/}
        <div className="flex justify-end items-center gap-6 text-sm text-[#4F4F4F] font-montserrat mt-5 mb-5 pt-5 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <span className="text-[#4F4F4F] font-normal">Showing</span>

            <div className="relative flex items-center">
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageNumber(1);
                }}
                className="appearance-none pl-3 pr-8 py-1.5 border border-[#26385A40] rounded-lg bg-white text-[#4F4F4F] font-normal focus:outline-none cursor-pointer text-sm"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>

              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[10px] text-gray-500">
                <MdOutlineArrowDropDown size={16} className="text-gray-500" />
              </span>
            </div>

            <span className="text-[#4F4F4F] font-normal pl-1">
              of {totalRecords} Results
            </span>
          </div>

          <div className="text-[#4F4F4F] font-normal">
            Page {pageNumber} of {Math.ceil(totalRecords / pageSize) || 1}
          </div>

          <div className="flex items-center gap-3 pl-2">
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((prev) => prev - 1)}
              className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors cursor-pointer text-base font-medium"
            >
              <GoChevronLeft />
            </button>
            <button
              disabled={pageNumber * pageSize >= totalRecords}
              onClick={() => setPageNumber((prev) => prev + 1)}
              className="text-gray-400 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed p-1 transition-colors cursor-pointer text-base font-medium"
            >
              <GoChevronRight />
            </button>
          </div>
        </div>
      </div>
      {/* View Task Details Modal */}
      <TaskDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        task={selectedTask}
        onEdit={() => {
          if (selectedTask?.id !== undefined) {
            setIsViewModalOpen(false);
            navigate(`/dashboard/tasks/edit/${selectedTask.id}`);
          }
        }}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        loading={deleteLoading}
      />
    </>
  );
}
