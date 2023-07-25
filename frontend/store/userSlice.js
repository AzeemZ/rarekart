import { createSlice } from "@reduxjs/toolkit";
import { setToken, removeToken } from "@/utils/helpers";

export const userslice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    addUser: (state, action) => {
      setToken(action.payload.jwt);

      const user = action.payload.user;

      state.user = user;
    },
    addUserOnInitialLoad: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      removeToken();

      state.user = {};
    },
  },
});

export const { addUser, addUserOnInitialLoad, removeUser } = userslice.actions;

export default userslice.reducer;
