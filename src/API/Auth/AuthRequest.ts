import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";
import jwt_decode from "jwt-decode";
import { UserInfo } from "../../Types/UserType";

export const RegistrationPostRequest = async (obj: UserInfo) => {
  try {
    const res: any = await ApiManager("/Authentication/Registration", {
      method: "POST",
      data: obj,
    });

    await AsyncStorage.setItem("token", res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const LoginPostRequest = async (obj: any) => {
  try {
    const res: any = await ApiManager("/Authentication/Login", {
      method: "POST",
      data: obj,
    });
    console.log(res);

    await AsyncStorage.setItem("token", res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
