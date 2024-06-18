import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetReferenceAnimalPhotos = async () => {
  try {
    //   const token = await AsyncStorage.getItem("token")
    const res = await ApiManager("Animal/GetAllAnimalIcon", {
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
