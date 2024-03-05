import { createSlice } from "@reduxjs/toolkit";
//   "name": "string",
//   "lastName": "string",
//   "password": "string",
//   "phoneNumber": "string",
//   "email": "string",
//   "cityId": 0,
//   "genderId": 0,
//   "birthDate": "2024-03-05"

type UserType = {
  name: string;
};

const initialState = {
  error: "",
  loading: "",
  success: "",
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
