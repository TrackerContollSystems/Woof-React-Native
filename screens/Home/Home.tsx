import { View, Text, Button } from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDecodedUserInfo } from "../../Store/Auth/Auth.slice";
const Home = () => {
  const userAuth = useSelector((state: any) => state.AuthSlice.authUser);
  const dispatch = useDispatch();
  const logout = async () => {
    await AsyncStorage.clear();

    dispatch(setDecodedUserInfo({}));
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
  if (userAuth && userAuth.email) {
    return (
      <View>
        <Text>User Name {userAuth.email}</Text>
        <Text onPress={() => console.log(userAuth)}>Test</Text>

        <Button title="logout" onPress={() => logout()} />
      </View>
    );
  } else {
    return (
      <View>
        <Text onPress={() => console.log(userAuth)}>Logged out</Text>
      </View>
    );
  }
};

export default Home;
