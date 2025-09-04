
export type UserType = {
  id: string;
  username: string;
  role: string;
}

export type UserLoginType = {
  username: string;
  password: string;
}

export type UserStoreType = {
  user: UserType | null;
  token: string | null;
  login: (user: UserLoginType) => Promise<unknown>;
  logout: () => void;
}
