import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("loggedUser")) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loggedUserData: (state, actions) => {
      state.user = actions.payload;
      localStorage.setItem("loggedUser", JSON.stringify(actions.payload));
    },
  },
});

export const { loggedUserData } = userSlice.actions;

export default userSlice.reducer;
