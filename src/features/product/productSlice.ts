import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { Product } from "../../types";

export const getPopularProducts = createAsyncThunk(
  "products/popular",
  async (_, thunkAPI) => {
    try {
      return await productService.popularProducts();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetProductState = createAction("RESET_PRODUCTS");

export interface productState {
  product: Product | null;
  products: Array<Product> | [];
  popular: Array<Product> | [];
  productSuccess: boolean;
  productLoading: boolean;
  productError: boolean;
  productMessage: string | null;
}

const initialState = {
  product: null,
  products: [],
  popular: [],
  productLoading: false,
  productSuccess: false,
  productError: false,
  productMessage: null,
} as productState;

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPopularProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getPopularProducts.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.popular = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getPopularProducts.rejected, (state, action) => {
        const data: any = action.payload;
        state.popular = [];
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(resetProductState, () => initialState);
  },
});

export default productSlice.reducer;
