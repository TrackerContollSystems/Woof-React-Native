import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth/Auth.slice";
const store = configureStore({
  reducer: { AuthSlice },
});

export default store;
