import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  GetCoutnryData,
  GetGenderData,
} from "../../../Store/RefrenceData/RefrenceData.Thunk";
import DropDownInput from "../../COMPONENTS/FormInputs/DropDownInput";

export default function MoreSignUpInfi() {
  const [showPass, setShowPass] = useState(true);
  const { RefrenceDataloading, genderData, cityData } = useSelector(
    (state: any) => state.RefrenceReducer
  );
  const navigation: any = useNavigation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    dispatch(GetCoutnryData());
    dispatch(GetGenderData());
  }, []);
  //   const TestNest = async () => {
  //     console.log("SOmething");
  //     try {
  //       console.log("TRY");
  //       const res = await axios.get("http://192.168.1.111:5165/City/GetCities");
  //       //   const res = await axios.get("http://192.168.1.111:3000/user/test");
  //       //   const res = await axios.get("http://localhost:5165/City/GetCities");
  //       console.log(res);
  //     } catch (err: any) {
  //       console.log("ERRO");
  //       console.log(err.message);
  //     }
  //   };
  return (
    <View style={style.mainView}>
      <View style={style.multyInputWrapper}>
        {/* <Button title="test" onPress={() => dispatch(GetCoutnryData())} />
        <Button title="test2" onPress={() => TestNest()} /> */}
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Gender</Text>
          <DropDownInput Data={cityData} id="cityId" name="cityName" />
          <View>
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>City</Text>
          <View>
            <TextInput placeholder="City" />
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Date Of Birth</Text>
          <View>
            <TextInput placeholder="Date Of Birth" />
            <View style={style.outLine}></View>
          </View>
        </View>
        <Text style={style.btn}>Create Account</Text>
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",
    padding: 15,
    paddingVertical: 40,
    justifyContent: "space-between",
  },
  multyInputWrapper: { display: "flex", gap: 40 },
  inputWrapper: {
    display: "flex",
    justifyContent: "space-between",
    height: 50,
  },
  lable: { fontWeight: "bold" },
  outLine: { width: "100%", height: 1, backgroundColor: "#D3D3D3" },
  icon: { width: 20, height: 20, marginRight: 6 },
  passwordInputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#2C3F51",
    color: "#EBEEEF",
    paddingVertical: 14,
    width: "97%",
    textAlign: "center",
    borderRadius: 10,
    fontSize: 19,
    fontWeight: "bold",
  },
  optionsWrapper: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: 180,
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
