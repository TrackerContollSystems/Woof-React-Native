import axios from "axios";
import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetUserAnimalsRequest = async (userId: any) => {
  try {
//   const token = await AsyncStorage.getItem("token")

    const res = await ApiManager(`/Animal/GetAnimalCover?UserId=${userId}`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
