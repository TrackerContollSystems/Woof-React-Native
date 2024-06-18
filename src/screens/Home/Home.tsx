import { View, Text, Button, ScrollView  } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../../Contexts/AuthContext";

import { useNavigation } from "@react-navigation/native";
import UserHeaders from "./UserHeaders";
import UserNavbar from "./UserNavbar";
import UserHeadersInfo from "./UserHeadersInfo";

const Home = () => {
  const { authState, authDispatch } = UseAuthContext();
  const navigation: any = useNavigation();

  const { authUser } = authState;
  const logout = async () => {
    await AsyncStorage.setItem("token", "");
    authDispatch({ type: "set_decoded_user", payload: {} });
    navigation.navigate(`Login`);
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
      <ScrollView  style={{ backgroundColor: "white" }}>
        <Button title="logout" onPress={() => logout()} />

        {/* <Text>User Name {authUser.email}</Text>
        <Text onPress={() => console.log(authUser)}>Test</Text> */}
        <UserNavbar />
        <UserHeaders />
        <UserHeadersInfo />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <UserNavbar />
        <UserHeaders />
        <UserHeadersInfo />
        {/* <Text onPress={() => console.log(authUser)}>Logged out s</Text> */}
      </ScrollView>
    );
  }
};

export default Home;
