import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import userService from "./userService";

export interface regUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export const registerUser = createAsyncThunk<
  User,
  regUser,
  { rejectValue: string }
>("user/registerUser", async (data, thunkAPI) => {
  try {
    return await userService.createUser(data);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetUserState = createAction("RESET_USER");

export interface userState {
  user: User | null;
  userSuccess: boolean;
  userLoading: boolean;
  userError: boolean;
  userMessage: string | null;
}

const initialState = {
  user: null,
  userLoading: false,
  userSuccess: false,
  userError: false,
  userMessage: null,
} as userState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = action.payload;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.user = null;
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = data?.message;
      })
      .addCase(resetUserState, () => initialState);
  },
});

export default userSlice.reducer;
