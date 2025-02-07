import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Role } from '../types/user';

const USER_STORAGE_LOCALKEY = 'user';

interface UserStore {
  user: User;
  setUser: (user: User) => void;
  resetUser: () => void;
  isUserReady: boolean;
  setupUser: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      isUserReady: false,
      user: { id: '', role: Role.USER },
      
      setUser: (user: User) => set({ user, isUserReady: true }),
      
      resetUser: () => set({ user: { id: '', role: Role.USER }, isUserReady: false }),
      
      setupUser: async () => {
        if (!get().isUserReady) {
          const newUser: User = {
            id: Math.random().toString(36).substring(7),
            role: Role.USER,
          };
          set({ user: newUser, isUserReady: true });
        }
      },
    }),
    {
      name: USER_STORAGE_LOCALKEY,
    }
  )
);

useUserStore.getState().setupUser();