/* Login Interface */
export interface ILoginData {
  email: string;
  password: string;
}
/* Register Interface */
export interface IRegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  profileImage?: FileList;
  password: string;
  confirmPassword: string;
  // error:string;
}
/* Forget Pass Interface */
export interface IForgetPasswordData {
  email: string;
}
/* Reset Pass Interface */
export interface IResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
}
/* Change Pass Interface */
export interface IChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}
/* Verify Pass Interface */
export interface IVerifyAccountData {
  email: string;
  code: string;
}
/* Api error message Interface */
export interface IApiError {
  message: string;
  statusCode: number;
}