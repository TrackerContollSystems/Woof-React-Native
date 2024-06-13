import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserInfo, decodedTokenType } from "../../Store/Auth/types/UserType";
import { ApiManager } from "../APIManager";
import jwt_decode from "jwt-decode";

export const RegistrationPostRequest = async (obj: UserInfo) => {
  try {
    const res: any = await ApiManager("/Authentication/Registration", {
      method: "POST",
      data: obj,
    });
    const token = res.headers["set-cookie"][0].split(";")[0].split("=")[1];
    await AsyncStorage.setItem("token", token);
    console.log(token);
    const decodedUserInfo: decodedTokenType = jwt_decode(token);
    console.log(decodedUserInfo);

    return decodedUserInfo;
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
    const token = res;
    await AsyncStorage.setItem("token", token);
    const decodedUserInfo: decodedTokenType = jwt_decode(token);

    return decodedUserInfo;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
