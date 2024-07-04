import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";

export const GetCoordinates = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await ApiManager(
      "MapCoordinate/GetAllAnimalCoordinatesByUser",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log("ANIMAL ERROR");

    console.log(error);
    console.log("ANIMAL ERROR");
    const err: any = error;
    throw new Error(err);
  }
};
