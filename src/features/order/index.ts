import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../types";
import axios from "axios";
import { apiUrl } from "../../config/config";
import { config } from "../../utils/axiosConfig";
import { RootState } from "../../app/store";

export const createOrder = createAsyncThunk<
  Order,
  Order,
  { rejectValue: string }
>("order/create", async (data, thunkAPI) => {
  try {
    const response = await axios.post(`${apiUrl}orders/`, data, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateOrder = createAsyncThunk<
  Order,
  OrderType,
  { rejectValue: string }
>("order/update", async (data, thunkAPI) => {
  try {
    const { id, ...restData } = data;
    const response = await axios.put(`${apiUrl}orders/${id}`, restData, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteOrder = createAsyncThunk(
  "order/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.put(`${apiUrl}orders/${id}`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getOrder = createAsyncThunk<
  Order,
  string,
  { rejectValue: string }
>("order/get", async (id, thunkAPI) => {
  try {
    const response = await axios.get(`${apiUrl}orders/${id}`, config);

    return response.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const getUserOrders = createAsyncThunk(
  "order/user",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}orders/user`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${apiUrl}orders/`, config);

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const resetOrderState = createAction("RESET_ORDER_STATE");

interface OrderType extends Order {
  id: string;
}

export interface OrderState {
  order: Order | null;
  orders: Order[];
  orderLoading: boolean;
  orderError: boolean;
  orderSuccess: boolean;
  orderMessage: string;
}

const initialState: OrderState = {
  order: null,
  orders: [],
  orderLoading: false,
  orderError: false,
  orderSuccess: false,
  orderMessage: "",
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(updateOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getOrder.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.orderLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.order = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.order = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.order = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.order = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.orders = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        const data: any = action.payload;
        const { success, message, ...restData } = data;
        state.orderLoading = false;
        state.orders = restData;
        state.orderError = false;
        state.orderSuccess = success ? success : true;
        state.orderMessage = message;
      })
      .addCase(createOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.order = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.order = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.order = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(getOrder.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.order = null;
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.orders = [];
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        const data: any = action.payload;
        const message = data?.response?.data?.message
          ? data?.response?.data?.message
          : data?.message;
        state.orderLoading = false;
        state.orders = [];
        state.orderError = true;
        state.orderSuccess = false;
        state.orderMessage = message;
      })
      .addCase(resetOrderState, () => initialState);
  },
});

export const selectOrderState = (state: RootState) => state.order;
export const selectOrder = (state: RootState) => state.order.order;
export const selectOrders = (state: RootState) => state.order.orders;

export default orderSlice.reducer;
