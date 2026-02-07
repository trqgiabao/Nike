import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      id: null,
      setAuth: (payload) =>
        set({
          accessToken: payload.accessToken ?? null,
          refreshToken: payload.refreshToken ?? null,
          id: payload.id ?? null,
        }),
      clearAuth: () =>
        set({ accessToken: null, refreshToken: null, id: null }),
    }),
    { name: "nike_auth" }
  )
);
