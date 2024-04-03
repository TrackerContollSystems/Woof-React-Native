import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth/Auth.slice";
import RefrenceReducer from "./RefrenceData/RefrenceData.slice";
import RecoveryReducer from "./PasswordRecovery/PasswordRecovery.slice";
const store = configureStore({
  reducer: { AuthSlice, RefrenceReducer, RecoveryReducer },
});

export default store;
