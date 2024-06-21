import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";

export const CreateAnimalRequest = async (body: any) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const { name, icon } = body;
    const res = await ApiManager("Animal/CreateAnimalCover", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        name,
        icon,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
