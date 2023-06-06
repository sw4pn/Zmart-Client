import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coupon } from "../../types";
import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { RootState } from "../../app/store";

export const createCoupon = createAsyncThunk(
  "coupon/add",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(`${apiUrl}coupons/`, data, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async (data, thunkAPI) => {
    try {
      const response = await axios.put(`${apiUrl}coupons/`, data, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${apiUrl}coupons/${id}`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getCoupon = createAsyncThunk(
  "coupon/get",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}coupons/${id}`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllCoupons = createAsyncThunk(
  "coupon/get-all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}coupons/`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const validateCoupon = createAsyncThunk<
  Coupon,
  string,
  { rejectValue: string }
>("coupon/validate", async (code, thunkAPI) => {
  try {
    const response = await axios.get(
      `${apiUrl}coupons/validate/${code}`,
      config
    );

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const resetCouponState = createAction("RESET_COUPON_STATE");

export interface couponState {
  coupon: Coupon | null;
  coupons: Coupon[];
  validated: boolean;
  couponError: false;
  couponSuccess: false;
  couponLoading: false;
  couponMessage: "";
}

const initialState = {
  coupon: null,
  coupons: [],
  validated: false,
  couponError: false,
  couponSuccess: false,
  couponLoading: false,
  couponMessage: "",
};

export const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(updateCoupon.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(getCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(getCoupon.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(getCoupon.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(getAllCoupons.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(validateCoupon.pending, (state) => {
        state.couponLoading = true;
      })
      .addCase(validateCoupon.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.coupon = restData;
        state.validated = success || false;
        state.couponLoading = false;
        state.couponError = false;
        state.couponSuccess = success ? success : true;
        state.couponMessage = data.message;
      })
      .addCase(validateCoupon.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.coupon = null;
        state.validated = false;
        state.couponLoading = false;
        state.couponError = true;
        state.couponSuccess = false;
        state.couponMessage = message;
      })
      .addCase(resetCouponState, () => initialState);
  },
});

export const selectCouponState = (state: RootState) => state.coupon;
export const selectCoupon = (state: RootState) => state.coupon.coupon;
export const selectCoupons = (state: RootState) => state.coupon.coupons;
export const selectIsValidated = (state: RootState) => state.coupon.validated;

export default couponSlice.reducer;
