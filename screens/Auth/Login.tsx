import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Login = () => {
  return (
    <View style={style.mainView}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Log In</Text>
      <View style={style.inputWrapper}>ა</View>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: { height: "100%", width: "100%", padding: 20 },
  inputWrapper: {},
});

export default Login;
