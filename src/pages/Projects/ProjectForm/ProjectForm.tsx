import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import type { NewProject } from "../../../interfaces/project.interface";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { apiProjects} from "../../../services/api";


export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const isEdit = pathname.includes("edit");
  const isView = pathname.includes("view");
  const isAdd  = pathname.includes("add");
  // FORM SETUP
const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
});
 const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm<NewProject>({
  resolver: zodResolver(formSchema),
});
  
  // GET PROJECT (VIEW / EDIT)
  const fetchProject = async () => {
    if (!id) return;

    try {
      const res = await apiProjects.getProjectById(Number(id));   
      console.log(res.data);
      const data = res?.data;

      if (!data) return;

      setValue("title", data.title ?? "");           
      setValue("description", data.description ?? "");

    } catch (error) {
      toast.error("Failed to load project");
      console.error("GET ERROR:", error);
    }
  };

  useEffect(() => {
    if (isEdit || isView) {
      fetchProject();
    }
  }, [id, pathname]);             

  // SUBMIT (ADD / EDIT)
  const onSubmit = async (data: NewProject) => {
    try {
      if (isAdd) {
        await apiProjects.createProject( data);
        toast.success("Project added successfully");
      }

      if (isEdit) {
        await apiProjects.updateProject(Number(id), data);
        toast.success("Project updated successfully");
      }

      navigate("/dashboard/projects");

    } catch (error) {
      toast.error(
        (error as any)?.response?.data?.message || "Something went wrong"
      );
      console.error("SUBMIT ERROR:", error);
    }
  };

  // TITLE
  const getTitle = () => {
    if (isAdd)  return "Add New Project";
    if (isEdit) return "Edit Project";
    return "View Project";
  };

  return (
    <>
      {/* HEADER */}
      <div className="bg-white p-5">
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </button>

        <h2 className="text-2xl font-bold mt-2">{getTitle()}</h2>
      </div>

      {/* FORM */}
      <div className="flex justify-center p-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-10 rounded-xl shadow w-2/3"
        >
          {/* TITLE */}
          <div className="mb-5">
            <label className="font-bold">Title</label>

            <input
              {...register("title")}
              disabled={isView}
              className="border w-full p-2 rounded mt-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-5">
            <label className="font-bold">Description</label>

            <textarea
              {...register("description")}
              disabled={isView}
              className="border w-full p-2 rounded mt-2 h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate("/dashboard/projects")}
              className="border px-6 py-2 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>

            {!isView && (
              <button
                type="submit"
                className="bg-amber-600 text-white px-10 py-2 rounded hover:bg-amber-700 transition-colors"
              >
                {isAdd ? "Save" : "Update"}
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}