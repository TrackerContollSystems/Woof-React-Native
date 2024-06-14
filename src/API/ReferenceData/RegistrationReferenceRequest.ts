import axios from "axios";
import { ApiManager } from "../APIManager";

export const GetGenderDataRequest = async () => {
  try {
    const res = await ApiManager("Gender/GetGenders", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};

export const GetCityDataRequest = async () => {
  try {
    const res = await ApiManager("/City/GetCities", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    const err: any = error;
    throw new Error(err);
  }
};
