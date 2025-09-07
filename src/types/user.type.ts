export type UserType = {
  id: string;
  username: string;
  role: string;
};

export type UserLoginType = {
  username: string;
  password: string;
};

export type AuthStoreType = {
  user: UserType | null;
  token: string | null;
  login: (user: UserLoginType) => Promise<unknown>;
  logout: () => void;
};

export type EmployeeType = {
  id?: string;
  name: string;
  role: string;
  status?: string;
};

export type EmployeeStoreType = {
  users: EmployeeType[];
  addUser: (user: EmployeeType) => void;
  deleteUser: (id: string) => void;
  updateUser: (id: string, data: EmployeeType) => void;
};

export type EmployeeFiltersType = {
  search: string;
  role: string;
  status?: string;
};

export type AdminLogType = {
  adminId: string;
  action: string;
  targetType: string;
  targetId: string;
  details?: unknown;
  timestamp: string;
};
