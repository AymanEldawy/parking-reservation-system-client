import { AuthService } from '@/services/api';
import type { UserLoginType, UserStoreType } from '@/types/user.type';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (user: UserLoginType) => {
        const data = await AuthService.login(user);
        console.log(data, 'dasdasdas');

        if (data.status !== 'error')
          set({ user: data.user, token: data.token });
        return data
      },
      logout: () => {
        set({ user: null, token: null, });
      },
    }),
    {
      name: 'PARKING_USER_KEY', // Key for localStorage
      partialize: (state) => ({ user: state.user, token: state.token }), // Persist only user and token
    }
  )
);