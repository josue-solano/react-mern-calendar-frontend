import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../calendar";

interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  user: User;
  errorMessage: string | undefined;
}

const initialState: AuthState = {
  status: "checking",
  user: {},
  errorMessage: undefined,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }: PayloadAction<string | undefined>) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
