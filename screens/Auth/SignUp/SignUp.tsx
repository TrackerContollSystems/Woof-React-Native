// @ts-ignore
import GooglePlus from "../../../assets/Icons/google-plus.png";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
// @ts-ignore
import closeEye from "../../../assets/Icons/find.png";
// @ts-ignore
import witness from "../../../assets/Icons/witness.png";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setEmail,
  setPassword,
  setPhoneNumber,
} from "../../../Store/Auth/Auth.slice";

export default function SignUp() {
  const [showPass, setShowPass] = useState(true);
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const { name, email } = useSelector(
    (state: any) => state.AuthSlice.userInputForm
  );
  return (
    <View style={style.mainView}>
      <View style={style.multyInputWrapper}>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Full name</Text>

          <View>
            <TextInput
              onChangeText={(text) => dispatch(setName(text))}
              placeholder="jon doe"
            />
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Phone Number</Text>
          <View>
            <TextInput
              onChangeText={(e) => dispatch(setPhoneNumber(e))}
              placeholder="+995 555 555"
            />
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Email</Text>

          <View>
            <TextInput
              onChangeText={(text) => dispatch(setEmail(text))}
              placeholder="example@gmail.com"
            />
            <View style={style.outLine}></View>
          </View>
        </View>
        <View style={style.inputWrapper}>
          <Text style={style.lable}>Password</Text>
          <View>
            <View style={style.passwordInputWrapper}>
              <TextInput
                onChangeText={(e) => dispatch(setPassword(e))}
                secureTextEntry={showPass}
                placeholder="**********"
              />
              <View>
                <TouchableOpacity onPress={() => setShowPass(!showPass)}>
                  <Image
                    style={style.icon}
                    source={showPass ? witness : closeEye}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.outLine}></View>
          </View>

          <Text
            style={{
              fontSize: 12,
              color: "gray",
              position: "absolute",
              top: 60,
              right: 4,
            }}
          >
            At least 6 characters
          </Text>
        </View>
      </View>
      <View style={style.optionsWrapper}>
        {/* <Text style={style.btn}>Create Account</Text> */}
        <Text
          onPress={() => navigation.navigate("User Info")}
          style={style.btn}
        >
          Next Step
        </Text>
        <Text>
          Or
          <Text
            onPress={() => navigation.navigate(`Login`)}
            style={{
              textDecorationLine: "underline",
              color: "orange",
              paddingHorizontal: 20,
            }}
          >
            {" Log In "}
          </Text>
          with:
        </Text>
        <View style={style.iconWrapper}>
          <Image source={GooglePlus} style={{ width: 40, height: 40 }} />
        </View>
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
