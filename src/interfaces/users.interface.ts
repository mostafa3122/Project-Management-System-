export interface IUserGroup {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}

export interface UserType {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  creationDate: string;
}
export interface IUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: boolean;
  group: IUserGroup;
  creationDate: string;
  modificationDate: string;
}
export interface IUsersResponse {
  message: string;
}