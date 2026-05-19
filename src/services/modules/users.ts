import axiosClient from "../api/axiosClient";

/* Get All Users */
export const GetUsersApi = (params?:object) => {
  return axiosClient.get("/Users",{params});
};

/* Get Single User */
export const GetUserByIdApi = (id: number) => {
  return axiosClient.get(`/Users/${id}`);
};
export const ToggleStatusApi = (id: number) => {
  return axiosClient.put(`/Users/${id}`);
};
