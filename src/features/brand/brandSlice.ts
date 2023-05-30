import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Brand } from "../../types";
import brandService from "./brandService";
import { RootState } from "../../app/store";

// export const registerUser = createAsyncThunk<
//   User,
//   regUser,
//   { rejectValue: string }
// >("user/registerUser", async (data, thunkAPI) => {
//   try {
//     return await userService.createUser(data);
//   } catch (err: any) {
//     return thunkAPI.rejectWithValue(err.response.data);
//   }
// });

export const getBrands = createAsyncThunk(
  "brands/getAll",
  async (_, thunkAPI) => {
    try {
      return await brandService.getAllBrands();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getBrand = createAsyncThunk<
  Brand,
  string,
  { rejectValue: string }
>("brands/getBrand", async (id, thunkAPI) => {
  try {
    return await brandService.getABrand(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetBrandState = createAction("RESET_BRANDS");

export interface brandState {
  brand: Brand | null;
  brands: Array<Brand>;
  brandCreated: undefined;
  brandDeleted: undefined;
  brandUpdated: undefined;
  brandSuccess: boolean;
  brandLoading: boolean;
  brandError: boolean;
  brandMessage: string | null;
}

const initialState = {
  brand: null,
  brands: [],
  brandCreated: undefined,
  brandDeleted: undefined,
  brandUpdated: undefined,
  brandLoading: false,
  brandSuccess: false,
  brandError: false,
  brandMessage: null,
} as brandState;

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBrand.pending, (state) => {
        state.brandLoading = true;
      })
      .addCase(getBrand.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.brand = action.payload;
        state.brandLoading = false;
        state.brandError = data?.error || false;
        state.brandSuccess = data?.success || true;
        state.brandMessage = data?.message;
      })
      .addCase(getBrand.rejected, (state, action) => {
        const data: any = action.payload;
        state.brand = null;
        state.brandLoading = false;
        state.brandError = true;
        state.brandSuccess = false;
        state.brandMessage = data?.message;
      })
      .addCase(getBrands.pending, (state) => {
        state.brandLoading = false;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.brands = arr;
        state.brandLoading = false;
        state.brandError = data?.error || false;
        state.brandSuccess = data?.success || true;
        state.brandMessage = data?.message;
      })
      .addCase(getBrands.rejected, (state, action) => {
        const data: any = action.payload;
        state.brands = [];
        state.brandLoading = false;
        state.brandError = true;
        state.brandSuccess = false;
        state.brandMessage = data?.message;
      })
      .addCase(resetBrandState, () => initialState);
  },
});

export const selectAllBrands = (state: RootState) => state.brand.brands;

export const selectBrandState = (state: RootState) => state.brand;

export default brandSlice.reducer;
