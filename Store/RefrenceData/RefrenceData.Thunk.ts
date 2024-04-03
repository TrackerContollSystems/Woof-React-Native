import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiManager } from "../../API/APIManager";

export const GetCoutnryData = createAsyncThunk("get/countries", async () => {
  console.log("country data triggered");
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
});

export const GetGenderData = createAsyncThunk("get/gender", async () => {
  try {
    const res = await ApiManager("/Gender/GetGenders", {
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
});
