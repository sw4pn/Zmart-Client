import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Color } from "../../types";
import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { RootState } from "../../app/store";

export const getAColor = createAsyncThunk<
  Color,
  { id: string },
  { rejectValue: string }
>("color/get-color", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}colors/${id}`, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getAllColors = createAsyncThunk(
  "color/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}colors/`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const addColor = createAsyncThunk<Color, Color, { rejectValue: string }>(
  "color/add-color",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}colors/`, data, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateAColor = createAsyncThunk<
  Color,
  Color,
  { rejectValue: string }
>("color/update-color", async (data, thunkAPI) => {
  try {
    const response = await axios.put(`${apiUrl}colors/`, data, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteAColor = createAsyncThunk<
  Color,
  Color,
  { rejectValue: string }
>("color/delete-color", async (id, thunkAPI) => {
  try {
    const response = await axios.delete(`${apiUrl}colors/${id}`, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetColorState = createAction("RESET_COLOR");

export interface ColorState {
  color: Color | null;
  colors: Color[];
  added: Color | undefined;
  updated: Color | undefined;
  deleted: Color | undefined;
  colorLoading: boolean;
  colorSuccess: boolean;
  colorError: boolean;
  colorMessage: string | null;
}

const initialState = {
  color: null,
  colors: [],
  added: undefined,
  updated: undefined,
  deleted: undefined,
  colorLoading: false,
  colorSuccess: false,
  colorError: false,
  colorMessage: null,
} as ColorState;

export const colorSlice = createSlice({
  name: "color",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addColor.pending, (state) => {
        state.colorLoading = true;
      })
      .addCase(addColor.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...resData } = data;
        state.added = resData;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = data.message;
      })
      .addCase(addColor.rejected, (state, action) => {
        const data: any = action.payload;
        const msg = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.added = undefined;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = msg;
      })
      .addCase(updateAColor.pending, (state) => {
        state.colorLoading = true;
      })
      .addCase(updateAColor.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...resData } = data;
        state.updated = resData;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = data.message;
      })
      .addCase(updateAColor.rejected, (state, action) => {
        const data: any = action.payload;
        const msg = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.updated = undefined;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = msg;
      })
      .addCase(deleteAColor.pending, (state) => {
        state.colorLoading = true;
      })
      .addCase(deleteAColor.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...resData } = data;
        state.deleted = resData;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = data.message;
      })
      .addCase(deleteAColor.rejected, (state, action) => {
        const data: any = action.payload;
        const msg = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.deleted = undefined;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = msg;
      })
      .addCase(getAColor.pending, (state) => {
        state.colorLoading = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { successs, message, ...resData } = data;
        state.color = resData;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = data.message;
      })
      .addCase(getAColor.rejected, (state, action) => {
        const data: any = action.payload;
        const msg = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.color = null;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = msg;
      })
      .addCase(getAllColors.pending, (state) => {
        state.colorLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...resData } = data;
        state.colors = resData;
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = data.message;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        const data: any = action.payload;
        const msg = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.colors = [];
        state.colorLoading = false;
        state.colorSuccess = true;
        state.colorError = false;
        state.colorMessage = msg;
      })
      .addCase(resetColorState, () => initialState);
  },
});

export const selectAllColors = (state: RootState) => state.color.colors;
export const selectAColor = (state: RootState) => state.color.color;
export const selectColorState = (state: RootState) => state.color;

export default colorSlice.reducer;
