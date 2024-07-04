import { Text, Button, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import UserHeader from "./UserHeader";
import UserMain from "./UserMain";
import UserInfo from "./UserInfo";
import { UseUiContext } from "../../Contexts/UiContext";

const Home = () => {
  const { authState, authDispatch } = UseAuthContext();
  const { authUser } = authState;
  const navigation: any = useNavigation();

  const logout = async () => {
    await AsyncStorage.setItem("token", "");
    authDispatch({ type: "set_decoded_user", payload: {} });
    navigation.navigate(`Login`);
  };

  useEffect(() => {
    if (!authUser.email) {
      navigation.navigate(`Login`);
    }
  }, []);

  if (authUser && authUser.email) {
    const { toggleTheme } = UseUiContext();
    return (
      <ScrollView style={{ backgroundColor: "white" }}>
        <Button title="logout" onPress={() => logout()} />
        <Text
          style={{ backgroundColor: "blue", padding: 10 }}
          onPress={toggleTheme}
        >
          Color
        </Text>
        <UserHeader />
        <UserMain />
        <UserInfo />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <Text onPress={() => console.log(authUser)}>Logged out </Text>
      </ScrollView>
    );
  }
};

export default Home;
