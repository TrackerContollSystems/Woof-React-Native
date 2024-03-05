import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth/Auth.slice";
import RefrenceReducer from "./RefrenceData/RefrenceData.slice";
const store = configureStore({
  reducer: { AuthSlice, RefrenceReducer },
});

export default store;
