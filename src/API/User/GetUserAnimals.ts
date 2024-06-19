import axios from "axios";
import { ApiManager } from "../APIManager";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const GetUserAnimalsRequest = async (userId: any) => {
  const usrId = userId.queryKey[1];

  console.log("USER ID");
  console.log(usrId);
  console.log("USER ID");
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await ApiManager(`/Animal/GetAnimalCoverByUser`, {
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

export const GetAnimalmages = async (imgUrl: string) => {
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      // console.log(reader.result);
      return reader.result;
    };

    // return reader.result;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
