import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiManager } from "../../API/APIManager";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RecoveryType } from "./PasswordRecovery.slice";
import { setDecodedUserInfo } from "../Auth/Auth.slice";

export const PasswordRecoveryByEmail = createAsyncThunk(
  "post/emailrecovery",
  async (email: string) => {
    try {
      const res: any = await ApiManager(
        "Authentication/PasswordRecoverByEmail",
        {
          method: "POST",
          data: { email: email },
        }
      );

      return res;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  }
);

export const CheckConfirmationCode = createAsyncThunk(
  "get/sendcode",
  async (Code: string) => {
    try {
      const res: any = await ApiManager(
        `Authentication/CheckConfirmationCode?code=${Code}`,
        {
          method: "GET",
        }
      );

      return res;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  }
);

export const ResetPasswordByAuthCode = createAsyncThunk(
  "post/authcoderecovery",
  async (obj: RecoveryType, { dispatch }) => {
    try {
      const res: any = await ApiManager("/Authentication/ResetPassword", {
        method: "POST",
        data: obj,
      });
      const token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
      await AsyncStorage.setItem("token", token);

      const decodedUserInfo = jwt_decode(token);
      console.log(decodedUserInfo);
      dispatch(setDecodedUserInfo(decodedUserInfo));
      return token;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  }
);
