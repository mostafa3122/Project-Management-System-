import { useEffect, useState } from "react";
import {
  BiDotsHorizontalRounded,
  BiEdit,
  BiFilter,
  BiPlus,
  BiSearch,
  BiShow,
  BiTrash,
} from "react-icons/bi";
import { LuChevronsUpDown } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { ITask } from "../../interfaces/task.interface";
import { DeleteTask, GetAllTasks } from "../../services/api/tasks";
import DeleteConfirmation from "../../shared/DeleteConfirmation/DeleteConfirmation";
import Loading from "../../shared/Loading/Loading";
import NoData from "../../shared/NoData/NoData";
import Pagination from "../../shared/Pagination/Pagination";
import StatusBadge from "../../shared/StatusBadge/StatusBadge";
import TaskDetailsModal from "./components/DetailsModal";
import SubHeader from "../../shared/SubHeader/SubHeader";
import ConfirmationModal from "../Projects/DeleteConfirmationModal/DeleteConfirmation";
import DetailsModal from "./components/DetailsModal";

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
      {/* Header */}
      <SubHeader
        title="Tasks"
        buttonLabel="Add New Task"
        onButtonClick={() => navigate("/dashboard/tasks/new")}
      />

      <div className=" py-6 px-9  bg-gray-200">
        <div className="flex bg-white rounded-lg shadow-[0px_4px_20px_0px_#0000000D] items-center gap-2 p-4 ">
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
          <table className="table custom-table w-full   ">
            <thead className="custom-head">
              <tr>
                <th className="px-6 py-2 font-normal w-1/4">
                  <div className="flex items-center gap-3">
                    <span>Title</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center gap-3">
                    <span>Statuses</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center gap-3">
                    <span>User</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center gap-3">
                    <span>Project</span>
                    <LuChevronsUpDown size={16} className="text-white" />
                  </div>
                </th>
                <th className="px-6 py-2 font-normal w-1/6">
                  <div className="flex items-center gap-3">
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
                  <td colSpan={7}>
                    <Loading />
                  </td>
                </tr>
              ) : tasksList?.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center text-gray-500 font-montserrat bg-white"
                  >
                    <NoData />
                  </td>
                </tr>
              ) : (
                tasksList.map((task, index) => (
                  <tr
                    className="odd:bg-white even:bg-[#F8F9FA] hover:bg-gray-100/70 transition-colors"
                    key={task?.id ?? index}
                  >
                    <td className="p-4 w-1/4 ">{task?.title}</td>
                    <td className="p-4 w-1/6 ">
                      <StatusBadge status={task?.status || ""} />
                    </td>
                    <td className="p-4 w-1/6">
                      {task?.employee?.userName || "Unassigned"}
                    </td>
                    <td className="p-4 w-1/6">
                      {task?.project?.title || "N/A"}
                    </td>
                    <td className="p-4 w-1/6">
                      {task.creationDate
                        ? new Date(task.creationDate).toLocaleDateString(
                          "en-GB"
                        )
                        : "N/A"}{" "}
                    </td>
                    <td className="p-4 w-12 relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (task?.id !== undefined) {
                            setActiveDropdownId(
                              activeDropdownId === task.id ? null : task.id
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
          <Pagination
            pageNumber={pageNumber}
            pageSize={pageSize}
            totalRecords={totalRecords}
            onPageChange={setPageNumber}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>
      {/* View Task Details Modal */}
      <DetailsModal
        variant="task"
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        data={selectedTask}
        onEdit={() => {
          setIsViewModalOpen(false);
          navigate(`/dashboard/tasks/edit/${selectedTask?.id}`);
        }}
      />
      {/*  modal delete */}
      <ConfirmationModal
        variant="delete"
        isOpen={isDeleteModalOpen}
        loading={deleteLoading}
        title="Delete Task"
        message="Are you sure you want to delete This Task?"
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
