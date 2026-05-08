"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { login as loginService } from "@/lib/mock/authService";

type User = {
  id: string;
  name: string;
  email: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (params: LoginParams) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      login: async (params) => {
        set({ isLoading: true, error: null });

        try {
          const result = await loginService(params);
          set({
            token: result.token,
            user: result.user,
            isLoading: false,
            error: null,
          });
        } catch (err) {
          const message =
            err instanceof Error ? err.message : "Login failed. Try again.";
          set({ isLoading: false, error: message });
          throw err;
        }
      },

      logout: () =>
        set({
          token: null,
          user: null,
          error: null,
        }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "admin-learning-auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);