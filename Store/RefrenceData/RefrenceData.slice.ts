import { createSlice } from "@reduxjs/toolkit";
import { GetCoutnryData, GetGenderData } from "./RefrenceData.Thunk";

const initialState = {
  error: "",
  RefrenceDataloading: false,
  success: "",
  cityData: [],
  genderData: [],
};

const RefrenceSlice = createSlice({
  name: "reference",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetCoutnryData.pending, (state) => {
        state.RefrenceDataloading = true;
        state.error = "";
        console.log("padding");
      })
      .addCase(GetCoutnryData.fulfilled, (state, action: any) => {
        state.RefrenceDataloading = false;
        state.cityData = action.payload;
        state.success = "Data ressived";
        console.log("fulfilled");
      })
      .addCase(GetCoutnryData.rejected, (state, action) => {
        state.RefrenceDataloading = false;
        state.error = " something went wrong ";
        console.log("rejected");
      })
      .addCase(GetGenderData.pending, (state) => {
        state.RefrenceDataloading = true;
        state.error = "";
      })
      .addCase(GetGenderData.fulfilled, (state, action: any) => {
        state.RefrenceDataloading = false;
        state.genderData = action.payload;
        state.success = "Data Ressived";
      })
      .addCase(GetGenderData.rejected, (state, action: any) => {
        state.RefrenceDataloading = false;
        state.error = "something went wrong ";
      });
  },
});

export const {} = RefrenceSlice.actions;
export default RefrenceSlice.reducer;
