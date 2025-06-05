import { configureStore } from "@reduxjs/toolkit";
import frirendReducer from "./slices/friendSlice";

export default configureStore({
  reducer: {
    friends: frirendReducer,
  },
});
