import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./cartSlice";
import userSliceReducer from "./userSlice";
import wishlistSliceReducer from "./wishlistSlice";

export default configureStore({
  reducer: {
    cart: cartSliceReducer,
    user: userSliceReducer,
    wishlist: wishlistSliceReducer,
  },
});
