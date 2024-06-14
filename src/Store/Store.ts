import { configureStore } from "@reduxjs/toolkit";

import RecoveryReducer from "./PasswordRecovery/PasswordRecovery.slice";
const store = configureStore({
  reducer: { RecoveryReducer },
});

export default store;
