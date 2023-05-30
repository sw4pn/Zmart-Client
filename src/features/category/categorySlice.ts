import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../types";
import categoryService from "./categoryService";
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

export const getCategories = createAsyncThunk(
  "categories/getAll",
  async (_, thunkAPI) => {
    try {
      return await categoryService.getAllCategories();
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const getCategory = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>("categories/getCategory", async (id, thunkAPI) => {
  try {
    return await categoryService.getACategory(id);
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetCategoryState = createAction("RESET_CATEGORY");

export interface categoryState {
  category: Category | null;
  categories: Array<Category>;
  catCreated: undefined;
  catDeleted: undefined;
  catUpdated: undefined;
  catSuccess: boolean;
  catLoading: boolean;
  catError: boolean;
  catMessage: string | null;
}

const initialState = {
  category: null,
  categories: [],
  catCreated: undefined,
  catDeleted: undefined,
  catUpdated: undefined,
  catLoading: false,
  catSuccess: false,
  catError: false,
  catMessage: null,
} as categoryState;

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.catLoading = true;
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.category = action.payload;
        state.catLoading = false;
        state.catError = data?.error || false;
        state.catSuccess = data?.success || true;
        state.catMessage = data?.message;
      })
      .addCase(getCategory.rejected, (state, action) => {
        const data: any = action.payload;
        state.category = null;
        state.catLoading = false;
        state.catError = true;
        state.catSuccess = false;
        state.catMessage = data?.message;
      })
      .addCase(getCategories.pending, (state) => {
        state.catLoading = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.categories = arr;
        state.catLoading = false;
        state.catError = data?.error || false;
        state.catSuccess = data?.success || true;
        state.catMessage = data?.message;
      })
      .addCase(getCategories.rejected, (state, action) => {
        const data: any = action.payload;
        state.categories = [];
        state.catLoading = false;
        state.catError = true;
        state.catSuccess = false;
        state.catMessage = data?.message;
      })
      .addCase(resetCategoryState, () => initialState);
  },
});

export const selectCategoryState = (state: RootState) => state.category;
export const selectCategories = (state: RootState) => state.category.categories;
export const selectCategory = (state: RootState) => state.category.category;

export default categorySlice.reducer;
