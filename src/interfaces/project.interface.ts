export interface Project {
  id: number;
  title: string;
  description: string;
  status?: string;
  creationDate?: string;
  modificationDate?: string;
  startDate?: string;
  endDate?: string;
  user?: Manager[];
  task?: Task[];
  manager?: Manager;
}

export interface Manager {
  id: number;
  userName: string;
  email: string;
  imagePath: string;
  country: string;
  phoneNumber: string;
  isVerified: boolean;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: string;
  creationDate?: string;
  modificationDate?: string;
}
export interface NewProject {
  title: string;
  description: string;
}

export interface ProjectsResponse {
  data: Project[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export type ProjectMode = "add" | "edit" | "view";