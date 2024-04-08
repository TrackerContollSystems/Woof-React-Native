import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import {
  GetCoutnryData,
  GetGenderData,
} from "../../../Store/RefrenceData/RefrenceData.Thunk";
import { Register } from "../../../Store/Auth/Auth.Thunk";
import DropDownInput from "../../COMPONENTS/FormInputs/DropDownInput";

import loadingIcon from "../../../assets/Icons/dog-treat.png";
import DateTimePicker from "@react-native-community/datetimepicker";
// @ts-ignore

import calendar from "../../../assets/Icons/calendar.png";
import {
  setCityId,
  setBirthDate,
  setGenderId,
} from "../../../Store/Auth/Auth.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";
export default function MoreSignUpInfi() {
  const [showPass, setShowPass] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, date: any) => {
    console.log(date);
    setShowPicker(Platform.OS === "ios");
    if (date) {
      dispatch(setBirthDate(date.toISOString().slice(0, 10)));
      setSelectedDate(date);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const setCity = (id: number) => {
    dispatch(setCityId(id));
  };
  const setGender = (id: number) => {
    dispatch(setGenderId(id));
  };
  const { RefrenceDataloading, genderData, cityData } = useSelector(
    (state: any) => state.RefrenceReducer
  );
  const { userInputForm, loading } = useSelector(
    (state: any) => state.AuthSlice
  );
  const { cityId, genderId } = userInputForm;
  const navigation: any = useNavigation();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

  useEffect(() => {
    const GetToken = async () => {
      dispatch(GetCoutnryData());
      dispatch(GetGenderData());
    };

    GetToken();
  }, []);
  const SignUp = () => {
    dispatch(Register(userInputForm));
    navigation.navigate(`Home`);
  };
  if (RefrenceDataloading || loading) {
    return <LoadingAnimation />;
  }

  return (
    <View style={style.mainView}>
      {/* <Text onPress={() => console.log(cityData)}>TEST</Text> */}
      <View style={style.multyInputWrapper}>
        {/* <Button title="test" onPress={() => dispatch(GetCoutnryData())} /> */}
        {/*  <Button title="test2" onPress={() => TestNest()} /> */}
        <View style={style.inputWrapper}>
          <Text style={style.lable}>City</Text>
          <DropDownInput
            setDispatch={setCity}
            Data={cityData}
            id="cityId"
            name="cityName"
          />
          <View>
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Gender</Text>
          <View>
            <DropDownInput
              setDispatch={setGender}
              Data={genderData}
              id="genderId"
              name="sex"
            />

            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <TouchableOpacity
            style={style.datePickerWrapper}
            onPress={showDatepicker}
          >
            <Image style={style.calendarImg} source={calendar} />
            <Text>Show Date Picker</Text>
          </TouchableOpacity>

          <View>
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
                style={style.datePicker}
              />
            )}
            <View style={style.outLine}></View>
          </View>
        </View>
        <Text onPress={() => SignUp()} style={style.btn}>
          Create Account
        </Text>
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

  image: {
    width: 100,
    height: 100,
  },
  datePicker: {
    width: 200,
    marginBottom: 20,
  },
  datePickerWrapper: {
    display: "flex",
    alignIiems: "center",

    gap: 10,
    paddingHorizontal: 2,
    flexDirection: "row",
  },
  calendarImg: {
    width: 25,
    height: 25,
  },
});
