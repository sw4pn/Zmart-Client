import axios from "axios";
import { RootState } from "../../app/store";
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";

// export const onSearch = (v) => {
//   return {
//     type: SEARCH_CHANGE,
//     payload: v,
//   };
// };

// export const onSuggestionsFetchRequested = (value) => {
//   const inputValue = value.value.trim().toLowerCase();

//   return async (dispatch, getState) => {
//     try {
//       if (inputValue && inputValue.length % 3 === 0) {
//         const response = await axios.get(`/api/search/${inputValue}`);

//         dispatch({
//           type: SUGGESTIONS_FETCH_REQUEST,
//           payload: response.data.products,
//         });
//       }
//     } catch (err) {
//       handleError(err);
//     }
//   };
// };

// export const onSuggestionsClearRequested = (val) => {
//   return {
//     type: SUGGESTIONS_CLEAR_REQUEST,
//     payload: [],
//   };
// };

export const searchProducts = createAsyncThunk<
  searchState,
  string,
  { rejectValue: string }
>("search/products", async (query, thunkAPI) => {
  try {
    const response = await axios.get(
      `${apiUrl}products/search/${query}`,
      config
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const resetSearchState = createAction("RESET_SEARCH_STATE");

export interface SearchProduct {
  title: string;
  slug: string;
  price: number;
  discount: number;
  thumbnail: {
    url: string;
    public_id: string;
  };
}

export interface searchState {
  // query: string;
  products: SearchProduct[];
  searchMessage: string;
}

const initialState: searchState = {
  // query: "",
  products: [],
  searchMessage: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, products } = data;
        state.products = products;
        state.searchMessage = message;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        const data: any = action.payload;
        const { success, message, products } = data;
        state.products = [];
        state.searchMessage = message;
      })
      .addCase(resetSearchState, () => initialState);
  },
});

export const selectSearchState = (state: RootState) => state.search;
export const selectSearchProducts = (state: RootState) => state.search.products;

export default searchSlice.reducer;
