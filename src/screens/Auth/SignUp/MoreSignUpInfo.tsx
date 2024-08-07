import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import jwt_decode from "jwt-decode";

import DropDownInput from "../../COMPONENTS/FormInputs/DropDownInput";

import DateTimePicker from "@react-native-community/datetimepicker";
// @ts-ignore

import calendar from "../../../assets/Icons/calendar.png";

import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";
import { UseAuthContext } from "../../../Contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { RegistrationPostRequest } from "../../../API/Auth/AuthRequest";
import { ErrorPopup } from "../../COMPONENTS/Status/StatusSucErr";
import {
  GetCityDataRequest,
  GetGenderDataRequest,
} from "../../../API/ReferenceData/RegistrationReferenceRequest";
import { UserInfo } from "../../../Types/UserType";
import { UseUiContext } from "../../../Contexts/UiContext";
import AuthButton from "../../COMPONENTS/Buttons/AuthButtons";
export default function MoreSignUpInfi() {
  const { authDispatch, authState } = UseAuthContext();
  const { toggleTheme, colors, theme } = UseUiContext();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const handleDispatch = (type: any, payload: any) => {
    authDispatch({ type, payload });
  };
  const handleDateChange = (event: any, date: any) => {
    setShowPicker(Platform.OS === "ios");
    if (date) {
      handleDispatch("set_birthDate", date.toISOString().slice(0, 10));
      setSelectedDate(date);
    }
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const setCity = (id: number) => {
    handleDispatch("set_cityId", id);
  };
  const setGender = (id: number) => {
    handleDispatch("set_genderId", id);
  };

  const navigation: any = useNavigation();

  const genderData = useQuery({
    queryKey: ["gender-id"],
    queryFn: GetGenderDataRequest,
  });

  const cityData = useQuery({
    queryKey: ["city-id"],
    queryFn: GetCityDataRequest,
  });

  //
  const mutation = useMutation({
    mutationFn: (obj: UserInfo) => {
      return RegistrationPostRequest(obj);
    },
    onSuccess(token) {
      const decodedToken = jwt_decode(token);
      authDispatch({ type: "set_decoded_user", payload: decodedToken });

      navigation.navigate(`Home`);
    },
    onError(err: any) {
      console.log("ERROR");
      console.log(err);
    },
  });

  //
  const { isPending, isError, error } = mutation;
  const errorMessage = (error && error.message) || "An error occurred.";
  const closeError = () => {
    mutation.reset();
  };
  const SignUp = async () => {
    console.log("authState.userInputForm");
    console.log(authState.userInputForm);
    await mutation.mutateAsync({ ...authState.userInputForm });
  };

  if (cityData.isPending || genderData.isPending || isPending) {
    return <LoadingAnimation />;
  }

  return (
    <KeyboardAvoidingView
      style={[
        style.mainView,
        {
          backgroundColor: colors.backgroundColor,
        },
      ]}
      // behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={style.mainView}>
          {/* <Text onPress={() => console.log(authState.userInputForm)}>
        LOG LOG LOG{" "}
      </Text> */}

          {isError && (
            <ErrorPopup message={errorMessage} onClose={closeError} />
          )}

          <View style={style.multyInputWrapper}>
            <View style={style.inputWrapper}>
              <Text
                style={[
                  style.lable,
                  {
                    color: colors.textColor,
                  },
                ]}
              >
                City
              </Text>
              <DropDownInput
                setDispatch={setCity}
                Data={cityData.data}
                id="cityId"
                name="cityName"
              />
              <View>
                <View style={style.outLine}></View>
              </View>
            </View>
            <View style={style.inputWrapper}>
              <Text
                style={[
                  style.lable,
                  {
                    color: colors.textColor,
                  },
                ]}
              >
                Gender
              </Text>
              <View>
                <DropDownInput
                  setDispatch={setGender}
                  Data={genderData.data}
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
                <Text
                  style={{
                    color: colors.textColor,
                  }}
                >
                  Show Date Picker
                </Text>
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

            <AuthButton fun={SignUp} title="Create Account" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    alignItems: "center",

    gap: 10,
    paddingHorizontal: 2,
    flexDirection: "row",
  },
  calendarImg: {
    width: 25,
    height: 25,
  },
});
