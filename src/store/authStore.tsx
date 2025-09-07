import { AuthService } from '@/services/api';
import type { UserLoginType, AuthStoreType } from '@/types/user.type';
import { create } from 'zustand'
import { persist } from 'zustand/middleware';

export const useAuthStore = create<AuthStoreType>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      login: async (user: UserLoginType) => {
        const data = await AuthService.login(user);
        if (data.status !== 'error')
          console.log(data, 'data');
          
          set({ user: data.user, token: data.token });
        return data
      },
      logout: () => {
        set({ user: null, token: null, });
      },
    }),
    {
      name: 'PARKING_USER_KEY',
      partialize(state) {
        const { user, token } = state;
        return { user, token };
      }
    }
  )
);