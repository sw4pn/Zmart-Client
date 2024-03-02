import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
import productReducer from "../features/product/productSlice";
import colorReducer from "../features/color/colorSlice";
import couponReducer from "../features/coupon/couponSlice";
import orderReducer from "../features/order/";
import searchReducer from "../features/search/";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    brand: brandReducer,
    category: categoryReducer,
    order: orderReducer,
    color: colorReducer,
    coupon: couponReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
