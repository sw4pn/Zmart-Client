import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import authService from "./authService";

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      return await authService.loadAUser();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetUser = createAction("RESET_AUTH");

interface initialStateProps {
  authUser: User | null;
  authLoading: boolean;
  authMessage: string | null;
}

const initialState: initialStateProps = {
  authUser: null,
  authLoading: false,
  authMessage: null,
};

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
        state.authUser = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.authUser = null;
        state.authMessage =
          action.payload.error?.message || "Something went wrong";
      });
  },
});

export default authSlice.reducer;
