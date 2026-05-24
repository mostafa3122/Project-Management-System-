import type { Project } from "../../interfaces/project.interface";
import axiosClient from "./axiosClient";

// GET  projects 
export const getProjects = (params:object) => {
  return axiosClient.get('/Project/manager',{params});
};
export const getProjectsByEmployee = (params: object) => {
  return axiosClient.get("/Project/employee", { params });
};

// GET project by id
export const getProjectById = (id: number) => {
  return axiosClient.get(`/Project/${id}`);
};

// CREATE project
export const createProject = (data: Project) => {
  return axiosClient.post("/Project", data);
};

// UPDATE project
export const updateProject = (id: number | string, data: Project) => {
  return axiosClient.put(`/Project/${id}`, data);
};

// DELETE project
export const deleteProject = (id: number | string) => {
  return axiosClient.delete(`/Project/${id}`);
};