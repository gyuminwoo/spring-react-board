import { create } from 'zustand';

// 認証情報を管理するZustandのストア
const useAuthStore = create((set) => ({
    isLoggedIn: false,  //　ログイン状態
    login: () => set({ isLoggedIn: true }),
    logout: () => set({ isLoggedIn: false }),
}));

export default useAuthStore;