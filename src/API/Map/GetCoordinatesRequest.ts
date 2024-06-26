import AsyncStorage from "@react-native-async-storage/async-storage";
import { ApiManager } from "../APIManager";

export const GetCoordinates = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await ApiManager(
      "MapCoordinate/GetMapCoordinateByDeviceImei?imei=172107729363",
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
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
