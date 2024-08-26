import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducer/userSlice";
import chatSlice from "./reducer/chatSlice";

export const store = configureStore({
  reducer: {
    loggedUser: userSlice,
    activeChat: chatSlice
  },
});
