import { createSlice } from "@reduxjs/toolkit";
import { LoginThunk, Register } from "./Auth.Thunk";
import { decodedTokenType, userInitialState } from "./types/UserType";
import { ResetPasswordByAuthCode } from "../PasswordRecovery/PasswordRecovery.thunk";
//   "name": "string",
//   "lastName": "string",
//   "password": "string",
//   "phoneNumber": "string",
//   "email": "string",
//   "cityId": 0,
//   "genderId": 0,
//   "birthDate": "2024-03-05"

const initialState: userInitialState = {
  error: "",
  loading: false,
  success: "",

  authUser: {},
  userInputForm: {
    fullName: "",
    password: "",
    phoneNumber: "",
    email: "",
    cityId: 0,
    genderId: 0,
    birthDate: "",
  },
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //   form input reducers
    setName(state, action) {
      state.userInputForm.fullName = action.payload;
    },
    setEmail(state, action) {
      state.userInputForm.email = action.payload;
    },
    setPhoneNumber(state, action) {
      state.userInputForm.phoneNumber = action.payload;
    },
    setPassword(state, action) {
      state.userInputForm.password = action.payload;
    },
    setCityId(state, action) {
      state.userInputForm.cityId = action.payload;
    },
    setGenderId(state, action) {
      state.userInputForm.genderId = action.payload;
    },
    setBirthDate(state, action) {
      state.userInputForm.birthDate = action.payload;
    },
    setDecodedUserInfo(state, action) {
      state.authUser = action.payload;
    },
    setReSetError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Register.pending, (state) => {
        state.loading = true;
      })
      .addCase(Register.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "user logged in";
        state.authUser = action.payload;
      })
      .addCase(Register.rejected, (state, action) => {
        state.loading = false;
        state.error = "SOMETHING WENT WRONG";
      })
      .addCase(LoginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(LoginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "User Has Been Logged In";
        console.log(action.payload);
        state.authUser = action.payload as decodedTokenType;
      })
      .addCase(LoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = "Something Went Wrong";
      });
  },
});

export const {
  setName,
  setEmail,
  setPhoneNumber,
  setPassword,
  setCityId,
  setGenderId,
  setBirthDate,
  setDecodedUserInfo,
  setReSetError,
} = AuthSlice.actions;

export default AuthSlice.reducer;
