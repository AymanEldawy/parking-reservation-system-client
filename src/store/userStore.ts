// generate fake store data to handle add new and delete and update role
import type { EmployeeStoreType, EmployeeType } from "@/types/user.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create<EmployeeStoreType>()(
  persist(
    (set, get) => ({
      users: [
        { id: "1", name: "John Doe", role: "admin", status: "active" },
        { id: "2", name: "Jane Smith", role: "employee", status: "inactive" },
        { id: "3", name: "Alice Johnson", role: "employee", status: "active" },
        { id: "4", name: "Bob Brown", role: "admin", status: "inactive" },
      ],
      addUser: (user: EmployeeType) => {
        set({ users: [...get().users, user] });
      },
      deleteUser: (id: string) => {
        set({ users: get().users.filter((user) => user.id !== id) });
      },
      updateUser: (id, data) => {
        set({
          users: get().users.map((user) =>
            user.id === id ? { ...user, ...data } : user
          ),
        });
      },
    }),
    {
      name: "USERS_DATA",
      partialize: (state) => ({ users: state.users }),
    }
  )
);
