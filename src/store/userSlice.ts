import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface User {
  id: number;
  email: string;
  role: string;
}

interface UserState {
  isAuth: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  isAuth: false,
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuth = true;
      state.user = action.payload;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.error = null;
    },
  },
});
export const { loginStart, loginSuccess, loginError, logout } =
  userSlice.actions;
export default userSlice.reducer;
