import type { AxiosError } from "axios";
import { ChevronsUpDown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { Project } from "../../../interfaces/project.interface";
import type { IUsersResponse } from "../../../interfaces/users.interface";
import { apiProjects } from "../../../services/api";
import Loading from "../../../shared/Loading/Loading";
import NoData from "../../../shared/NoData/NoData";
import Pagination from "../../../shared/Pagination/Pagination";
import SubHeader from "../../../shared/SubHeader/SubHeader";
import ConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmation";

import {
  BiDotsHorizontalRounded,
  BiEdit,
  BiShow,
  BiTrash,
} from "react-icons/bi";
import type { ITask } from "../../../interfaces/task.interface";
import TaskDetailsModal from "../../Task/components/DetailsModal";
import DetailsModal from "../../Task/components/DetailsModal";
export default function ProjectList() {
  const navigate = useNavigate();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  // state for delete confirmation modal
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  // pagination
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  // states
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // outside click
  useEffect(() => {
    const handleOutsideClick = () => setActiveDropdownId(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleOpenDelete = (id: number) => {
    setSelectedId(id);
    setOpenDelete(true);
  };
  // get all projects list
  const getProjectsList = async () => {
    try {
      setLoading(true);
      const response = await apiProjects.getProjects({
        pageNumber: pageNumber,
        pageSize: pageSize,
      });
      setAllProjects(response?.data?.data || []);
      setTotalRecords(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      const axiosError = error as AxiosError<IUsersResponse>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // delete project by id
  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    try {
      setLoading(true);
      await apiProjects.deleteProject(selectedId);
      toast.success("Project deleted successfully");
      setAllProjects((prev) => prev.filter((p) => p.id !== selectedId));
      setOpenDelete(false);
      setSelectedId(null);
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      toast.error(
        axiosError.response?.data?.message ||
        axiosError.message ||
        "Failed to delete project"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectsList();
  }, [pageNumber, pageSize]);


  const filteredProjects = allProjects.filter((project) =>
    project.title?.toLowerCase().includes(searchValue.toLowerCase())
  );
  return (
    <>
      {/* Header */}
      <SubHeader
        title="Projects"
        buttonLabel="Add New Project"
        onButtonClick={() => navigate("/dashboard/projects/add")}
      />

      <div className=" py-6 px-9 bg-gray-200 ">
        <div className="bg-white rounded-lg shadow-[0px_4px_20px_0px_#0000000D] items-center gap-2  ">
          <div className="filter flex p-4 gap-2 ">
            <div className="search-input relative cursor-pointer w-52">
              <input
                type="text"
                placeholder="Search Fleets"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full rounded-3xl cursor-pointer text-gray-500 border border-[#26385A40] py-2 pl-10 pr-4 outline-none "
              />
              <Search
                size={16}
                strokeWidth={2}
                className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-black"
              />
            </div>
          </div>
        </div>

        <table className="table w-full h-full bg-white   ">
          <thead className="custom-head">
            <tr className="divide-x divide-black-200">
              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span> Title</span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>

              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span>Status</span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>

              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span>Num Users</span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>
              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span>Num Tasks</span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>
              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span>Date Created</span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>
              <th className="px-6 py-2 font-normal">
                <div className="flex items-center gap-3">
                  <span></span>
                  <ChevronsUpDown size={16} strokeWidth={2} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-[#4F4F4F] font-normal">
            {loading ? (
              <tr>
                <td colSpan={7}>
                  <Loading />
                </td>
              </tr>
            ) : filteredProjects.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <NoData />
                </td>
              </tr>
            ) : (
              filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="odd:bg-white even:bg-[#F8F9FA] hover:bg-gray-100/70 transition-colors"
                >
                  <td className="p-4 ">{project.title}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${(project.status ?? "").toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : " bg-[#315951E5] text-white"
                        }`}
                    >
                      {project.status ?? "Public"}
                    </span>
                  </td>

                  <td className="p-4  ">
                    {Array.isArray(project.user) ? project.user.length : "N/A"}
                  </td>

                  <td className="p-4   ">
                    {Array.isArray(project.task) ? project.task.length : "N/A"}
                  </td>

                  <td className="p-4   ">
                    {project.creationDate
                      ? new Date(project.creationDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="p-4 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveDropdownId(
                          activeDropdownId === project.id ? null : project.id
                        );
                      }}
                      className="text-[#0E382F] hover:bg-[#0E382F]/10 transition-colors p-2 rounded-full active:scale-95 flex items-center justify-center cursor-pointer"
                    >
                      <BiDotsHorizontalRounded size={20} />
                    </button>

                    {activeDropdownId === project.id && (
                      <div className="absolute right-4 top-12 w-32 bg-white rounded-2xl shadow-[0px_4px_20px_0px_#00000015] border border-[#F1F5F9] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 font-montserrat">
                        <div className="absolute -top-1.5 left-20 w-3 h-3 bg-white border-t border-l border-[#F1F5F9] rotate-45 z-0"></div>

                        <div className="relative z-10">
                          <button
                            onClick={() => {
                              setSelectedProject(project);
                              setIsViewModalOpen(true);
                              setActiveDropdownId(null);
                            }}
                            className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-[#26385A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                          >
                            <BiShow className="text-[#0E382F]" size={18} />
                            <span>View</span>
                          </button>

                          <button
                            onClick={() =>
                              navigate(`/dashboard/projects/edit/${project.id}`)
                            }
                            className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-sm text-[#26385A] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                          >
                            <BiEdit className="text-[#0E382F]" size={18} />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={() => handleOpenDelete(project.id)}
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
        {/* View project  Details Modal */}
        <DetailsModal
          variant="project"
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          data={selectedProject}
          onEdit={() =>
            navigate(`/dashboard/projects/edit/${selectedProject?.id}`)
          }
        />
        {/*  modal delete */}
        <ConfirmationModal
          variant="delete"
          isOpen={openDelete}
          title="Delete Project"
          message="Are you sure you want to delete this project? "
          loading={loading}
          onClose={() => setOpenDelete(false)}
          onConfirm={handleConfirmDelete}
        />
        <Pagination
          pageNumber={pageNumber}
          pageSize={pageSize}
          totalRecords={totalRecords}
          onPageChange={setPageNumber}
          onPageSizeChange={setPageSize}
        />
      </div>
    </>
  );
}
