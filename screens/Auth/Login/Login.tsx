import React, { useEffect, useState } from "react";
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
import {
  setEmail,
  setPassword,
  setReSetError,
} from "../../../Store/Auth/Auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { LoginThunk } from "../../../Store/Auth/Auth.Thunk";
import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";
import { ErrorPopup, SuccessPopup } from "../../COMPONENTS/Status/StatusSucErr";
const Login = () => {
  const [showPass, setShowPass] = useState(true);
  const navigation: any = useNavigation();
  const { userInputForm, loading, authUser, error } = useSelector(
    (state: any) => state.AuthSlice
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const login = () => {
    console.log(userInputForm);
    const { email, password } = userInputForm;
    dispatch(LoginThunk({ email, password }));
  };
  const closeError = () => {
    dispatch(setReSetError());
  };

  useEffect(() => {
    if (authUser && authUser.email) {
      navigation.navigate(`Home`);
    }
  }, [authUser]);
  if (loading) {
    return <LoadingAnimation />;
  } else {
    return (
      <View style={style.mainView}>
        {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>Log In</Text> */}
        <ErrorPopup message={error} onClose={closeError} />
        {/* <SuccessPopup message={error} onClose={closeError} /> */}
        <View style={style.multyInputWrapper}>
          <View style={style.inputWrapper}>
            <Text style={style.lable}>Email</Text>
            <View>
              <TextInput
                onChangeText={(text) => dispatch(setEmail(text))}
                placeholder="email"
              />
              <View style={style.outLine}></View>
            </View>
          </View>
          <View style={style.inputWrapper}>
            <Text style={style.lable}>Password</Text>
            <View>
              <View style={style.passwordInputWrapper}>
                <TextInput
                  onChangeText={(text) => dispatch(setPassword(text))}
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
                textDecorationLine: "underline",
                fontSize: 12,
                color: "gray",
                position: "absolute",
                top: 60,
                right: 4,
              }}
            >
              Forgot password?
            </Text>
          </View>
        </View>
        <View style={style.optionsWrapper}>
          <Text onPress={login} style={style.btn}>
            Sign In
          </Text>
          <Text>Or log in with:</Text>
          <View style={style.iconWrapper}>
            <Image source={GooglePlus} style={{ width: 40, height: 40 }} />
          </View>
          <View style={style.bottomTextWrapper}>
            <Text>No account yet ?</Text>
            <Text
              onPress={() => navigation.navigate(`Signup`)}
              style={{
                textDecorationLine: "underline",
                color: "orange",
              }}
            >
              Sign Up!
            </Text>
            <Text
              onPress={() => navigation.navigate(`ForgotPassword`)}
              style={{
                textDecorationLine: "underline",
                color: "green",
              }}
            >
              Forgot A Password ?
            </Text>
          </View>
        </View>
      </View>
    );
  }
};

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
  bottomTextWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  iconWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});

export default Login;
