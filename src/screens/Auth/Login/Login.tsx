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
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
// @ts-ignore
import closeEye from "../../../assets/Icons/find.png";
// @ts-ignore
import witness from "../../../assets/Icons/witness.png";
import { useNavigation } from "@react-navigation/native";
import jwt_decode from "jwt-decode";

import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";
import { ErrorPopup, SuccessPopup } from "../../COMPONENTS/Status/StatusSucErr";
import { useMutation } from "@tanstack/react-query";
import { LoginPostRequest } from "../../../API/Auth/AuthRequest";
import { UseAuthContext } from "../../../Contexts/AuthContext";
import AuthButtons from "../../COMPONENTS/Buttons/AuthButtons";
import AuthButton from "../../COMPONENTS/Buttons/AuthButtons";
const Login = () => {
  const { authState, authDispatch } = UseAuthContext();
  //

  const handleDispatch = (type: any, payload: string) => {
    authDispatch({ type, payload });
  };

  const navigation: any = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const [showPass, setShowPass] = useState(true);

  const mutation = useMutation({
    mutationFn: (obj: any) => {
      return LoginPostRequest(obj);
    },
    onSuccess(token) {
      const decodedToken = jwt_decode(token);
      authDispatch({ type: "set_decoded_user", payload: decodedToken });

      navigation.navigate(`Home`);
    },
    onError(err) {
      console.log(err);
    },
  });
  const { isPending, isError, isSuccess, error } = mutation;

  //

  const login = async () => {
    const { email, password } = authState.userInputForm;
    await mutation.mutateAsync({ email, password });
  };
  const closeError = () => {
    mutation.reset();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const errorMessage = (error && error.message) || "An error occurred.";

  {
    return (
      <KeyboardAvoidingView
        style={style.mainView}
        // behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={style.viewWrapper}>
            {isError && (
              <ErrorPopup message={errorMessage} onClose={closeError} />
            )}
            {/* <SuccessPopup message={error} onClose={closeError} /> */}
            <View style={style.multyInputWrapper}>
              {/* <Text>{authState.userInputForm.email}</Text> */}

              <View style={style.inputWrapper}>
                <Text style={style.lable}>Email</Text>
                <View>
                  <TextInput
                    onChangeText={(text) => handleDispatch("set_email", text)}
                    placeholder="email"
                    style={{ width: "85%" }}
                  />
                  <View style={style.outLine}></View>
                </View>
              </View>
              <View style={style.inputWrapper}>
                <Text style={style.lable}>Password</Text>
                <View>
                  <View style={style.passwordInputWrapper}>
                    <TextInput
                      style={{ width: "85%" }}
                      onChangeText={(text) =>
                        handleDispatch("set_password", text)
                      }
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
                {isPending && <LoadingAnimation />}
                <Text
                  style={{
                    textDecorationLine: "underline",
                    fontSize: 12,
                    color: "gray",
                    position: "absolute",
                    top: 60,
                    right: 4,
                  }}
                  onPress={() => navigation.navigate(`ForgotPassword`)}
                >
                  Forgot password?
                </Text>
              </View>
            </View>

            <View style={style.optionsWrapper}>
              <AuthButton fun={login} title=" Sign In" />

              {/* <Text>Or log in with:</Text>
              <View style={style.iconWrapper}>
                <Image source={GooglePlus} style={{ width: 40, height: 40 }} />
              </View> */}
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
                {/* <Text
                  onPress={() => navigation.navigate(`ForgotPassword`)}
                  style={{
                    textDecorationLine: "underline",
                    color: "green",
                  }}
                >
                  Forgot A Password ?
                </Text> */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
};

const style = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",
    padding: 15,
    paddingVertical: 40,
  },
  viewWrapper: {
    width: "100%",
    height: "100%",
    display: "flex",

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
