import type {
  IChangePasswordData,
  IForgetPasswordData,
  ILoginData,
  IResetPasswordData,
  IVerifyAccountData,
} from "../../interfaces/auth.interface";
import axiosClient from "./axiosClient";

export const LoginApi = (data: ILoginData) => {
  return axiosClient.post("/Users/Login", data);
};
export const RegisterApi = (data: FormData) => {
  return axiosClient.post("/Users/Register", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
export const VerifyApi = (data: IVerifyAccountData) => {
  return axiosClient.put("/Users/verify", data);
};
export const ResetApi = (data: IResetPasswordData) => {
  return axiosClient.post("/Users/Reset", data);
};
export const ForgetApi = (data: IForgetPasswordData) => {
  return axiosClient.post("/Users/Reset/Request", data);
};
export const ChangPasswrodApi = (data: IChangePasswordData) => {
  return axiosClient.put("/Users/ChangePassword", data);
};
