import type { ITask } from "../../interfaces/task.interface";
import axiosClient from "./axiosClient";

export const GetAllTasks = (params?: {
  pageSize?: number;
  pageNumber?: number;      
  title?: string;
  status?: string;
}) => {
  return axiosClient.get("/Task/manager", { params });
};

export const DeleteTask = (taskId: string| number) => {
  return axiosClient.delete(`/Task/${taskId}`);
};
export const CreateTask = (task: ITask) => {
  return axiosClient.post("/Task", task);
};
export const UpdateTask = (taskId: string | number, task: ITask) => {
  return axiosClient.put(`/Task/${taskId}`, task);
};
export const GetTaskById = (taskId: string | number) => {
  return axiosClient.get(`/Task/${taskId}`);
};


