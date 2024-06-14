import { View, Text, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../../Contexts/AuthContext";
const Home = () => {
  const { authState } = UseAuthContext();

  const { authUser } = authState;
  const logout = async () => {
    await AsyncStorage.setItem("token", "");

    console.log("LOG OUT");
  };
  const l = async () => {
    console.log("delte token triggered");
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  if (authUser && authUser.email) {
    return (
      <View>
        <Text>User Name {authUser.email}</Text>
        <Text onPress={() => console.log(authUser)}>Test</Text>

        <Button title="logout" onPress={() => logout()} />
      </View>
    );
  } else {
    return (
      <View>
        <Text onPress={() => console.log(authUser)}>Logged out</Text>
      </View>
    );
  }
};

export default Home;
