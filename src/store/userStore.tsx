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
        const response = await AuthService.login(user);
        if (response.statusText === 'OK')
          set({ user: response.data.user, token: response.data.token });
        return response
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