export interface ITaskUser {
  id: number;
  userName: string;
  email: string;
}

export interface ITaskProject {
  id: number;
  title: string;
  description: string;
}

export interface ITask {
  id?: number;
  title: string;
  description: string;
  status?: "ToDo" | "InProgress" | "Done" | string;
  employee?: ITaskUser | null;
  project?: ITaskProject | null;
  employeeId?: number | string;
  projectId?: number | string;
  creationDate?: string;
}
export interface ITaskResponse {
  message: string;
}

export interface ITaskUser {
  id: number;
  userName: string;
  email: string;
}

export interface ITaskProject {
  id: number;
  title: string;
  description: string;
}

export interface ITask {
  id?: number;
  title: string;
  description: string;
  status?: "ToDo" | "InProgress" | "Done" | string;
  employee?: ITaskUser | null;
  project?: ITaskProject | null;
  employeeId?: number | string;
  projectId?: number | string;
  creationDate?: string;
}

// employee
export interface Column {
  id: string;
  title: string;
  status: "ToDo" | "InProgress" | "Done";
}

export interface TasksState {
  data: Record<string, ITask[]>;
  dataLength: number;
  columns: Column[];
  columnOrder: string[];
}
