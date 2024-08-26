import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: JSON.parse(localStorage.getItem("activeChat")) || null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    activeChat: (state, actions) => {
      state.active = actions.payload;
      localStorage.setItem("activeChat", JSON.stringify(actions.payload));
    },
  },
});

export const { activeChat } = chatSlice.actions;

export default chatSlice.reducer;
