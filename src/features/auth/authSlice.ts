import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { User } from "../../types";
import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { RootState } from "../../app/store";

interface logUser {
  email: string;
  password: string;
}

export const loadUser = createAsyncThunk<User>("auth/loadUser", async () => {
  const response = await axios.get(`${apiUrl}auth/verify-user`, config);
  const data = await response.data;
  return data;
});

export const loginUser = createAsyncThunk<
  User,
  logUser,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}auth/login`, data, config);
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authMessage: string | null;
  authLoading?: boolean;
  authSuccess?: boolean;
  authError?: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authMessage: null,
  authLoading: false,
  authError: false,
  authSuccess: false,
};

export const resetAuthState = createAction("RESET_AUTH");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = data;
        state.authLoading = false;
        state.isAuthenticated = data?.success ? true : false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.authLoading = false;
        state.authMessage = data?.message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(resetAuthState, () => initialState)
      .addDefaultCase((state) => state);
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
