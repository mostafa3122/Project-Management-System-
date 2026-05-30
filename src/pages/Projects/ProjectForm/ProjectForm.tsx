import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import type { NewProject } from "../../../interfaces/project.interface";
import { apiProjects } from "../../../services/api";
import Loading from "../../../shared/Loading/Loading";

export default function ProjectForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { pathname } = useLocation();

  const isEdit = pathname.includes("edit");
  const isView = pathname.includes("view");
  const isAdd = pathname.includes("add");

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
      setLoading(true);
      const res = await apiProjects.getProjectById(Number(id));
      console.log(res.data);
      const data = res?.data;

      if (!data) return;

      setValue("title", data.title ?? "");
      setValue("description", data.description ?? "");
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to load project"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit || isView) {
      fetchProject();
    }
  }, [id, pathname]);

  // SUBMIT (ADD / EDIT)
  const onSubmit = async (data: NewProject) => {
    setSubmitting(true);
    try {
      if (isAdd) {
        await apiProjects.createProject(data);
        toast.success("Project added successfully");
      }

      if (isEdit) {
        await apiProjects.updateProject(Number(id), data);
        toast.success("Project updated successfully");
      }

      navigate("/dashboard/projects");
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      toast.error(
        axiosError.response?.data?.message ||
          axiosError.message ||
          "Something went wrong"
      );
      console.error("SUBMIT ERROR:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // TITLE
  const getTitle = () => {
    if (isAdd) return "Add New Project";
    if (isEdit) return "Edit Project";
    return "View Project";
  };

  return (
    <>
      {/* Page Header */}
      <div className="bg-white p-6">
        <button
          onClick={() => {
            navigate("/dashboard/projects");
          }}
          className="inline-flex items-center gap-1.5 text-[#0E382F] hover:text-[#263D37] font-montserrat font-normal text-sm transition-colors duration-200 group"
        >
          <FiChevronLeft
            size={20}
            className="transform transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span>Back to Projects</span>
        </button>
        <h1 className="text-[#0E382F] font-medium text-2xl mt-1">
          {getTitle()}
        </h1>
      </div>

      {/* Form Container */}
      <div className="bg-[#F8F9FB] py-4 px-6 min-h-[450px] flex items-center justify-center">
        {loading ? (
          <Loading />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-2xl border border-[#F1F5F9] shadow-[0px_2px_4px_0px_#00000040] p-6 max-w-4xl w-full mx-auto font-quicksand"
          >
            {/* Title */}
            <div className="flex flex-col mb-4">
              <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                Title
              </label>
              <input
                type="text"
                placeholder="Title"
                disabled={isView}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-[#000000] placeholder-[#CCCCCC] focus:outline-none focus:border-[#315951] bg-white transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1 font-montserrat">
                  {errors.title.message}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="flex flex-col mb-6">
              <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                Description
              </label>
              <textarea
                placeholder="Description"
                disabled={isView}
                rows={3}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-black placeholder-[#CCCCCC] focus:outline-none focus:border-[#315951] bg-white transition-all resize-none h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 font-montserrat">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-[#F1F5F9] pt-4 flex justify-between items-center">
              <button
                type="button"
                disabled={submitting}
                onClick={() => navigate("/dashboard/projects")}
                className="px-8 py-2 border-[1.5px] border-[#0E382F] rounded-full text-[#0E382F] hover:bg-[#0E382F]/5 transition-colors font-normal text-sm cursor-pointer font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              {!isView && (
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-2 bg-[#EF9B28] hover:bg-[#d98a20] transition-colors rounded-full text-white font-normal text-sm cursor-pointer shadow-sm font-montserrat flex items-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save</span>
                  )}
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </>
  );
}
