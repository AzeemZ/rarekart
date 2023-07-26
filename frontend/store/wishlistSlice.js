import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      const isProductInWishlist = state.products.some(
        (p) => p.id === product.id
      );

      if (!isProductInWishlist) {
        state.products.push(product);
      }
    },
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(
        (product) => product.id !== productId
      );
    },
    clearWishlist: (state) => {
      state.products = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
