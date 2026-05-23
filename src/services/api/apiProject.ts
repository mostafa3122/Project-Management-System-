import axiosClient from "./axiosClient";

// GET  projects 
export const getProjects = (params:object) => {
  return axiosClient.get('/Project/manager',{params});
};

// GET project by id
export const getProjectById = (id: number) => {
  return axiosClient.get(`/Project/${id}`);
};

// CREATE project
export const createProject = (data: any) => {
  return axiosClient.post("/Project", data);
};

// UPDATE project
export const updateProject = (id: number | string, data: any) => {
  return axiosClient.put(`/Project/${id}`, data);
};

// DELETE project
export const deleteProject = (id: number | string) => {
  return axiosClient.delete(`/Project/${id}`);
};