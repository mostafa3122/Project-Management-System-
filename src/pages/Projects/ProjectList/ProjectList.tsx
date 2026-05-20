import { useEffect, useState } from "react";
import type { Project} from "../../../interfaces/project.interface";
import { toast } from "react-toastify";
import { ChevronsUpDown, Plus, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionsDropdown from "../TableAction/TableAction";
import DeleteConfirmModal from "../DeleteConfirmationModal/DeleteConfirmation";
import { apiProjects} from "../../../services/api";
export default function ProjectList() {
  const navigate=useNavigate();
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  // state for delete confirmation modal
const [openDelete, setOpenDelete] = useState(false);
const [selectedId, setSelectedId] = useState<number | null>(null);
const [loading, setLoading] = useState(false);

const handleOpenDelete = (id: number) => {
  setSelectedId(id);
  setOpenDelete(true);
};
// get all projects list
  const getProjectsList = async () => {
    try {
      const response = await apiProjects.getProjects();
      setAllProjects(response?.data?.data || []);
      // toast.success(response?.data?.message || "Projects loaded successfully");
    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "Failed to fetch projects",
      );
    }
  };


  // delete project by id
  const handleConfirmDelete = async () => {
  if (!selectedId) return;

  try {
    setLoading(true);

    await apiProjects.deleteProject(selectedId);

    toast.success("Project deleted successfully");

    setAllProjects((prev) =>
      prev.filter((p) => p.id !== selectedId)
    );

    setOpenDelete(false);
    setSelectedId(null);
  } catch (error) {
    toast.error(
      (error as any)?.response?.data?.message || "Failed to delete project",
    );
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    getProjectsList();
  }, []);

  // filter projects based on search value
 const filteredProjects = allProjects.filter((project) =>
  project.title?.toLowerCase().includes(searchValue.toLowerCase())
);
  return (
    <>
      {/* Header */}
      <div className="container flex justify-center items-center bg-white mt-1 gap-4">
        <div className="flex items-center justify-between p-5 w-full">
          <h2 className="text-3xl text-gray-700 ">Projects</h2>

          <button   onClick={() => navigate("/dashboard/projects/add")}
            className="bg-amber-500 text-white rounded-4xl px-11 py-3 font-semibold"
            style={{ cursor: "pointer" }}
          >
            <Plus className="inline-block mr-4 " size={26} />
            Add New Project
          </button>
        </div>
      </div>

      <div className=" py-15 m-9  bg-white  rounded-lg ">
        <form className="flex items-center gap-4 mb-6 rounded-lg w-2xl  px-4 py-2  "> 
         
<div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg w-2xl focus-within:ring-2 focus-within:ring-emerald-900 transition">
  
  <SearchIcon className="text-gray-500" size={20} />

  <input
    type="text"
    placeholder="Search By Title..."
    value={searchValue}
    onChange={(e) => setSearchValue(e.target.value)}
    className="flex-1 bg-transparent outline-none caret-emerald-600"
  />
</div>                
        </form>
        {/*  modal delete */}
        <DeleteConfirmModal
  open={openDelete}
  loading={loading}
  title="Delete Project"
  description="Are you sure you want to delete this project?"
  onClose={() => setOpenDelete(false)}
  onConfirm={handleConfirmDelete}
/>
        <table
          className="table w-full h-full mt-10 bg-white   "
          style={{ minWidth: 580, borderCollapse: "collapse" }}
        >
          <thead className="custom-head">
            <tr className="divide-x divide-black-200">
              <th >
                <div className="flex items-center gap-3 text-sm font-normal">

                      <span> Title</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>

                </th>

              <th >
                <div className="flex items-center gap-3 text-sm font-normal">
                      <span>Status</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                    </th>

              <th >
                <div className="flex items-center gap-3 text-sm font-normal">
                      <span>Num Users</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                    </th>
              <th >
                <div className="flex items-center gap-3 text-sm font-normal">
                      <span>Num Tasks</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                    </th>
              <th >
                <div className="flex items-center gap-3 text-sm font-normal">
                      <span>Date Created</span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                    </th>
              <th >
                <div className="flex items-center gap-3 text-sm font-normal">
                      <span></span>
                      <ChevronsUpDown size={16} strokeWidth={2} />
                    </div>
                    </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black-200">
            <tr className="divide-x divide-black-200" />
            {filteredProjects.map((project) => (
              
              <tr
                key={project.id}
                className="border-b transition-colors  even:bg-gray-100 odd:bg-white"
              >
                <td className="py-3 px-6 text-gray-700">{project.title}</td>

                <td className="py-3 px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      (project.status ?? "").toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : " bg-emerald-900 text-white"
                    }`}
                  >
                    {project.status ?? "Public"}
                  </span>
                </td>

                <td className="py-3 px-6 text-center text-gray-700">
                  {Array.isArray(project.user) ? project.user.length : 0}
                </td>

                <td className="py-3 px-6 text-center  text-gray-700">
                  {Array.isArray(project.task) ? project.task.length : 0}
                </td>

                <td className="py-3 px-6 text-center  text-gray-700">
                  {project.creationDate
                    ? new Date(project.creationDate).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="py-3 px-6 text-center">
                  <ActionsDropdown
  onView={() => navigate(`/dashboard/projects/view/${project.id}`) }
  onEdit={() => navigate(`/dashboard/projects/edit/${project.id}`)}
  onDelete={() =>  handleOpenDelete(project.id)}
/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      

    </>
  );
}
