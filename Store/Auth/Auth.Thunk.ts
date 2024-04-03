import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserInfo, setDecodedUserInfo } from "./Auth.slice";
import { ApiManager } from "../../API/APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

export const Register = createAsyncThunk(
  "post/register",
  async (obj: UserInfo, { dispatch }) => {
    console.log(obj);
    try {
      const res: any = await ApiManager("/Authentication/Registration", {
        method: "POST",

        data: obj,
      });
      const token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
      await AsyncStorage.setItem("token", token);
      console.log(token);
      const decodedUserInfo = jwt_decode(token);
      console.log(decodedUserInfo);
      dispatch(setDecodedUserInfo(decodedUserInfo));

      return decodedUserInfo;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  }
);

export const LoginThunk = createAsyncThunk(
  "post/login",
  async (obj: any, { dispatch }) => {
    console.log(obj);
    try {
      const res: any = await ApiManager("/Authentication/Login", {
        method: "POST",
        data: obj,
      });

      const token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
      await AsyncStorage.setItem("token", token);
      const decodedUserInfo = jwt_decode(token);

      dispatch(setDecodedUserInfo(decodedUserInfo));
      return decodedUserInfo;
    } catch (error) {
      console.log(error);
      const err: any = error;
      throw new Error(err);
    }
  }
);
