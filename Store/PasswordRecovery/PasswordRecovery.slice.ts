import { createSlice } from "@reduxjs/toolkit";
import {
  CheckConfirmationCode,
  PasswordRecoveryByEmail,
  ResetPasswordByAuthCode,
} from "./PasswordRecovery.thunk";

export type RecoveryType = {
  NewPassword: string;
  Code: number | null;
};

export type initialStateType = {
  RecoveryObj: RecoveryType;
  email: string;
  loading: boolean;
  success: string;
  error: string;
  step: number;
};

const initialState: initialStateType = {
  RecoveryObj: {
    NewPassword: "",
    Code: null,
  },
  email: "",
  success: "",
  error: "",
  loading: false,
  step: 1,
};

const RecoverySlice = createSlice({
  name: "recovery",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setNewPassword(state, action) {
      state.RecoveryObj.NewPassword = action.payload;
    },
    setCode(state, action) {
      state.RecoveryObj.Code = action.payload;
    },
    reSetError(state, action) {
      state.error = action.payload;
    },
    reSetSuccsess(state) {
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PasswordRecoveryByEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(PasswordRecoveryByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = `გთხოვთ შეამოწმოთ თქვენი ემაილი ${state.email}`;
        state.step += 1;
      })
      .addCase(PasswordRecoveryByEmail.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.errors[0].Email\
        console.log(action.error);
        state.error = "wrong email";
      })
      .addCase(CheckConfirmationCode.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(CheckConfirmationCode.fulfilled, (state, action) => {
        state.loading = false;
        state.step += 1;
        state.success = `კოდი გაიგზავნა`;
      })
      .addCase(CheckConfirmationCode.rejected, (state, action) => {
        state.loading = false;

        state.error = "Code is not correct";
      })
      .addCase(ResetPasswordByAuthCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(ResetPasswordByAuthCode.fulfilled, (state) => {
        state.loading = false;
        state.success = `პაროლი წარმატებით შეიცვალა`;
      })
      .addCase(ResetPasswordByAuthCode.rejected, (state) => {
        state.loading = false;
        state.error = "ერრორ ";
      });
  },
});

export default RecoverySlice.reducer;

export const { setEmail, setNewPassword, setCode, reSetError, reSetSuccsess } =
  RecoverySlice.actions;
