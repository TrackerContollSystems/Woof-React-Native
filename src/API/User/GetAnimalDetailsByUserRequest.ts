import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetAnimalDetailsByUser = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await ApiManager("Animal/GetAnimalDetailsByUser", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
