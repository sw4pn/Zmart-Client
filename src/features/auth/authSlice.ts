import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Cart, CartItem, Product, User } from "../../types";
import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { RootState } from "../../app/store";

interface logUser {
  email: string;
  password: string;
}

export const loadUser = createAsyncThunk<User>("auth/loadUser", async () => {
  const response = await axios.get(`${apiUrl}auth/verify-user`, config);
  const data = await response.data;
  return data;
});

export const loginUser = createAsyncThunk<
  User,
  logUser,
  { rejectValue: string }
>("auth/loginUser", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}auth/login`, data, config);
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}auth/logout`, config);

    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err);
  }
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}carts/`, data, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

interface CartIt extends CartItem {
  productId: string;
}

export const updateCart = createAsyncThunk<
  CartIt,
  CartIt,
  { rejectValue: string }
>("cart/update", async (data, thunkAPI) => {
  try {
    const response = await axios.put(
      `${apiUrl}carts/${data.productId}`,
      data,
      config
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${apiUrl}carts/${id}`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const emptyCart = createAsyncThunk("cart/empty", async (_, thunkAPI) => {
  try {
    const response = await axios.delete(`${apiUrl}carts/`, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getWishlist = createAsyncThunk(
  "wishlist/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}auth/wishlist`, config);
      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const toggleWishlist = createAsyncThunk<
  User,
  { productId: string },
  { rejectValue: string }
>("wishlist/toggle", async (id, thunkAPI) => {
  try {
    const response = await axios.put(
      `${apiUrl}auth/wishlist`,
      { productId: id },
      config
    );
    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export interface AuthState {
  user: User | null;
  cart: Cart | null;
  wishlist: Array<Product>;
  isAuthenticated: boolean;
  authMessage: string | null;
  authLoading?: boolean;
  authSuccess?: boolean;
  authError?: boolean;
}

const initialState: AuthState = {
  user: null,
  cart: null,
  wishlist: [],
  isAuthenticated: false,
  authMessage: null,
  authLoading: false,
  authError: false,
  authSuccess: false,
};

export const resetAuthState = createAction("RESET_AUTH");

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = data;
        state.authLoading = false;
        state.isAuthenticated = data?.success ? true : false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const data: any = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.authLoading = false;
        state.authMessage = data?.message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(logout.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        const data: any = action.payload;
        state.user = null;
        state.authLoading = false;
        state.isAuthenticated = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(logout.rejected, (state, action) => {
        const data: any = action.payload;
        state.user = null;
        state.isAuthenticated = false;
        state.authLoading = false;
        state.authMessage = data?.message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(addToCart.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.cart = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(addToCart.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.cart = null;
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(emptyCart.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.cart = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(updateCart.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.cart = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(updateCart.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.cart = null;
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.cart = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.cart = null;
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      // .addCase(removeFromWishlist.pending, (state) => {
      //   state.authLoading = true;
      // })
      // .addCase(removeFromWishlist.fulfilled, (state, action) => {
      //   const data: any = action.payload;
      //   const { success, message, ...arr } = data;
      //   state.wishlist = arr;
      //   state.authLoading = false;
      //   state.authSuccess = data?.success || true;
      //   state.authError = data?.error || false;
      //   state.authMessage = data?.message;
      // })
      // .addCase(removeFromWishlist.rejected, (state, action) => {
      //   const data: any = action.payload;
      //   const message = data?.response?.data?.message
      //     ? data?.response?.data?.message
      //     : data?.message;
      //   state.wishlist = null;
      //   state.authLoading = false;
      //   state.authMessage = message;
      //   state.authSuccess = false;
      //   state.authError = true;
      // })
      .addCase(toggleWishlist.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.user = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        // state.user = null;
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(getWishlist.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...arr } = data;
        state.user = arr;
        state.authLoading = false;
        state.authSuccess = data?.success || true;
        state.authError = data?.error || false;
        state.authMessage = data?.message;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        // state.wishlist = [];
        state.authLoading = false;
        state.authMessage = message;
        state.authSuccess = false;
        state.authError = true;
      })
      .addCase(resetAuthState, () => initialState)
      .addDefaultCase((state) => state);
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectCart = (state: RootState) => state.auth.user?.cart;
export const selectWishlist = (state: RootState) => state.auth.user?.wishlist;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;

export default authSlice.reducer;
