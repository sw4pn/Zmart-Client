import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import authService from "./authService";

export const loadUser = createAsyncThunk<User, void, { rejectValue: string }>(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      return await authService.loadAUser();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetAuthState = createAction("RESET_AUTH");

interface initialStateProps {
  authUser: User | null;
  authSuccess: boolean;
  authLoading: boolean;
  authError: boolean;
  authMessage: string | null;
}

const initialState = {
  authUser: null,
  authLoading: false,
  authSuccess: false,
  authError: false,
  authMessage: null,
} as initialStateProps;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        console.log("respo: ", action.payload);
        state.authUser = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.authUser = null;
        state.authLoading = false;
        state.authError = true;
        state.authSuccess = false;
        state.authMessage = data?.message;
      })
      .addCase(resetAuthState, () => initialState);
  },
});

export default authSlice.reducer;
