import { configureStore } from "@reduxjs/toolkit";
import GetAllProductsReducer from "../slices/GetAllProducts";
import GetAllProductFromCartReducer from "../slices/CartProduct"
import GetAllOrderHistoryReducer from "../slices/GetOrderHistory"
export const store = configureStore({
  reducer: {
    AllProducts: GetAllProductsReducer,
    AllOrderHistory: GetAllOrderHistoryReducer,
    AllProductInCart: GetAllProductFromCartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});