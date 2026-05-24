import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronLeft } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import type { AxiosError } from "axios";
import type { ITask } from "../../../interfaces/task.interface";
import { toast } from "react-toastify";
import {
  CreateTask,
  UpdateTask,
  GetTaskById,
  fetchEmployeeList,
  fetchProjectsList,
} from "../../../services/api/tasks";
import Loading from "../../../shared/Loading/Loading";

export default function TaskData() {
  const { id } = useParams();
  const isEditMode = !!id;

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [usersList, setUsersList] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITask>({
    defaultValues: {
      title: "",
      description: "",
      projectId: "",
      employeeId: "",
    },
  });

  const onSubmit = async (data: ITask) => {
    setSubmitting(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        employeeId: Number(data.employeeId),
        projectId: Number(data.projectId),
      };

      if (isEditMode && id) {
        await UpdateTask(id, payload);
        toast.success("Task updated successfully!");
      } else {
        await CreateTask(payload);
        toast.success("Task created successfully!");
      }
      navigate("/dashboard/tasks");
    } catch (error) {
      const axiosError = error as AxiosError<any>;
      toast.error(axiosError.response?.data?.message || "something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const loadFormData = async () => {
      try {
        setLoading(true);
        const [projRes, empRes] = await Promise.all([
          fetchProjectsList(),
          fetchEmployeeList(),
        ]);
        let projects = projRes.data || [];
        let employees = empRes.data || [];

        if (isEditMode && id) {
          const taskRes = await GetTaskById(id);
          const task = taskRes.data;
          if (
            task.employee &&
            !employees.some((e: any) => e.id === task.employee.id)
          ) {
            employees = [...employees, task.employee];
          }

          if (
            task.project &&
            !projects.some((p: any) => p.id === task.project.id)
          ) {
            projects = [...projects, task.project];
          }

          reset({
            title: task.title,
            description: task.description,
            employeeId: task.employee?.id || "",
            projectId: task.project?.id || "",
          });
        }
        setProjectsList(projects);
        setUsersList(employees);
      } catch (error) {
        const axiosError = error as AxiosError<any>;
        toast.error(
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Failed to load task details."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [id, isEditMode, reset]);

  return (
    <>
      {/* Page Header */}
      <div className="bg-white p-6">
        <button
          onClick={() => {
            navigate("/dashboard/tasks");
          }}
          className="inline-flex items-center gap-1.5 text-[#0E382F] hover:text-[#263D37] font-montserrat font-normal  text-sm transition-colors duration-200 group"
        >
          <FiChevronLeft
            size={20}
            className="transform transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          <span>View All Tasks</span>
        </button>
        <h1 className="text-[#0E382F] font-medium text-2xl mt-1">
          {isEditMode ? "Edit Task" : "Add a New Task"}
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
            <div className="flex flex-col mb-4">
              <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                Title
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-[#000000] placeholder-[#CCCCCC] focus:outline-none focus:border-[#315951] bg-white transition-all"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs mt-1 font-montserrat">
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                Description
              </label>
              <textarea
                placeholder="Description"
                rows={3}
                className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-black placeholder-[#CCCCCC] focus:outline-none focus:border-[#315951]  bg-white transition-all resize-none"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <span className="text-red-500 text-xs mt-1 font-montserrat">
                  {errors.description.message}
                </span>
              )}
            </div>

            {isEditMode ? (
              <>
                <input type="hidden" {...register("employeeId")} />
                <input type="hidden" {...register("projectId")} />
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                    User
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-black focus:outline-none focus:border-[#315951] bg-white cursor-pointer"
                    {...register("employeeId", {
                      required: "Assignee is required",
                    })}
                  >
                    <option value="">No Users Selected</option>
                    {usersList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.userName}
                      </option>
                    ))}
                  </select>
                  {errors.employeeId && (
                    <span className="text-red-500 text-xs mt-1 font-montserrat">
                      {errors.employeeId.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col relative">
                  <label className="text-sm font-semibold text-[#4F4F4F] mb-1.5">
                    Project
                  </label>
                  <select
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#ECECEC] text-sm text-black focus:outline-none focus:border-[#315951] bg-white cursor-pointer"
                    {...register("projectId", {
                      required: "Project is required",
                    })}
                  >
                    <option value="">No Status Selected</option>
                    {projectsList.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title || project.projectName}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && (
                    <span className="text-red-500 text-xs mt-1 font-montserrat">
                      {errors.projectId.message}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="border-t border-[#F1F5F9] pt-4 flex justify-between items-center">
              <button
                type="button"
                disabled={submitting}
                onClick={() => navigate("/dashboard/tasks")}
                className="px-8 py-2 border-[1.5px] border-[#0E382F] rounded-full text-[#0E382F] hover:bg-[#0E382F]/5 transition-colors font-normal text-sm cursor-pointer font-montserrat disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
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
            </div>
          </form>
        )}
      </div>
    </>
  );
}
