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

export const getUsers = createAsyncThunk(
  "users/getAll",
  async (_, thunkAPI) => {
    try {
      return await userService.getAllUsers();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getAUser = createAsyncThunk(
  "users/getAUser",
  async (id, thunkAPI) => {
    try {
      return await userService.getAUser(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "users/updateAUser",
  async (user, thunkAPI) => {
    try {
      return await userService.updateAUser(user);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (data, thunkAPI) => {
    try {
      return await userService.changePassword(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, thunkAPI) => {
    try {
      return await userService.deleteAUser(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const resetUserState = createAction("RESET_USER");

export interface userState {
  user: User | null;
  users: User[];
  updated: User | undefined;
  deleted: User | undefined;
  userSuccess: boolean;
  userLoading: boolean;
  userError: boolean;
  userMessage: string | null;
}

const initialState = {
  user: null,
  users: [],
  updated: undefined,
  deleted: undefined,
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
      .addCase(getUsers.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...arr } = data;
        state.users = arr;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(getUsers.rejected, (state, action) => {
        const data: any = action.payload;
        state.users = [];
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = data?.message;
      })
      .addCase(getAUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...arr } = data;
        state.user = arr;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(getAUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.user = null;
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = data?.message;
      })
      .addCase(updateAUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...arr } = data;
        state.updated = arr;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(updateAUser.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.updated = undefined;
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...arr } = data;
        state.deleted = arr;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.deleted = undefined;
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = data?.message;
      })
      .addCase(changePassword.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...arr } = data;
        state.updated = arr;
        state.userLoading = false;
        state.userError = data?.error || false;
        state.userSuccess = data?.success || true;
        state.userMessage = data?.message;
      })
      .addCase(changePassword.rejected, (state, action) => {
        const data: any = action?.payload;
        // console.log(data.response.message);
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.updated = undefined;
        state.userLoading = false;
        state.userError = true;
        state.userSuccess = false;
        state.userMessage = message;
      })
      .addCase(resetUserState, () => initialState);
  },
});

export default userSlice.reducer;
