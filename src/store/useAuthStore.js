import { create } from 'zustand';

// 認証情報を管理するZustandのストア
const useAuthStore = create((set) => ({
  token: null,
  user: null,
  setAuth: ({ token, user }) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));

export default useAuthStore;