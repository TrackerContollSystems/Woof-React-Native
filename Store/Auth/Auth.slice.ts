import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: "",
  loading: "",
  succsess: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
