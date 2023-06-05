import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";
import { Product, Review } from "../../types";
import { RootState } from "../../app/store";

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

export const getFeaturedProducts = createAsyncThunk(
  "products/featured",
  async (_, thunkAPI) => {
    try {
      return await productService.featuredProducts();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getSpecialProducts = createAsyncThunk(
  "products/special",
  async (_, thunkAPI) => {
    try {
      return await productService.specialProducts();
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getProductBySlug = createAsyncThunk<
  Product,
  string,
  { rejectValue: string }
>("products/slug", async (slug, thunkAPI) => {
  try {
    return await productService.productBySlug(slug);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getProductByCategory = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("products/category", async (id, thunkAPI) => {
  try {
    return await productService.productByCategory(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getProductByBrand = createAsyncThunk<
  Product[],
  string,
  { rejectValue: string }
>("products/brand", async (id, thunkAPI) => {
  try {
    return await productService.productByBrand(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

interface ReviewType extends Review {
  id: string;
  reviewId: string;
}

export const addReview = createAsyncThunk<
  Product,
  ReviewType,
  { rejectValue: string }
>("review/add", async (data, thunkAPI) => {
  try {
    const { id, ...restData } = data;
    return await productService.addReview(id, restData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateReview = createAsyncThunk<
  Product,
  ReviewType,
  { rejectValue: string }
>("review/update", async (data, thunkAPI) => {
  try {
    const { id, ...restData } = data;
    return await productService.updateReview(id, restData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteReview = createAsyncThunk<
  Product,
  ReviewType,
  { rejectValue: string }
>("review/delete", async (data, thunkAPI) => {
  try {
    const { id, ...restData } = data;
    return await productService.deleteReview(id, restData);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getAllProducts = createAsyncThunk(
  "products/all",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
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
  featured: Array<Product> | [];
  special: Array<Product> | [];
  productSuccess: boolean;
  productLoading: boolean;
  productError: boolean;
  productMessage: string | null;
}

const initialState = {
  product: null,
  products: [],
  popular: [],
  special: [],
  featured: [],
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
      .addCase(getFeaturedProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getFeaturedProducts.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.featured = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getFeaturedProducts.rejected, (state, action) => {
        const data: any = action.payload;
        state.featured = [];
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(getSpecialProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getSpecialProducts.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.special = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getSpecialProducts.rejected, (state, action) => {
        const data: any = action.payload;
        state.special = [];
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(getProductBySlug.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProductBySlug.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.product = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getProductBySlug.rejected, (state, action) => {
        const data: any = action.payload;
        state.product = null;
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(getProductByCategory.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProductByCategory.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.products = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getProductByCategory.rejected, (state, action) => {
        const data: any = action.payload;
        state.products = [];
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(getProductByBrand.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProductByBrand.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.products = arr;
        state.productLoading = false;
        state.productError = data?.error || false;
        state.productSuccess = data?.success || true;
        state.productMessage = data?.message;
      })
      .addCase(getProductByBrand.rejected, (state, action) => {
        const data: any = action.payload;

        state.products = [];
        state.productLoading = false;
        state.productError = true;
        state.productSuccess = false;
        state.productMessage = data?.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { message, success, ...restData } = data;
        state.products = restData;
        state.productLoading = false;
        state.productMessage = message;
        state.productError = false;
        state.productSuccess = true;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.products = [];
        state.productError = true;
        state.productLoading = false;
        state.productSuccess = false;
        state.productMessage = message;
      })
      .addCase(addReview.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { message, success, ...restData } = data;
        state.product = restData;
        state.productLoading = false;
        state.productSuccess = success ? success : true;
        state.productError = false;
        state.productMessage = message;
      })
      .addCase(addReview.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.productError = true;
        state.productLoading = false;
        state.productSuccess = false;
        state.productMessage = message;
      })
      .addCase(updateReview.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(updateReview.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { message, success, ...restData } = data;
        state.product = restData;
        state.productLoading = false;
        state.productSuccess = success ? success : true;
        state.productError = false;
        state.productMessage = message;
      })
      .addCase(updateReview.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.productError = true;
        state.productLoading = false;
        state.productSuccess = false;
        state.productMessage = message;
      })
      .addCase(deleteReview.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { message, success, ...restData } = data;
        state.product = restData;
        state.productLoading = false;
        state.productSuccess = success ? success : true;
        state.productError = false;
        state.productMessage = message;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.productError = true;
        state.productLoading = false;
        state.productSuccess = false;
        state.productMessage = message;
      })
      .addCase(resetProductState, () => initialState);
  },
});

export const selectProductState = (state: RootState) => state.product;
export const selectProducts = (state: RootState) => state.product.products;
export const selectAProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;
