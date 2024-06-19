import { View, Text, Button, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../../Contexts/AuthContext";
import RNFetchBlob from "rn-fetch-blob";
import { useNavigation } from "@react-navigation/native";
import UserHeaders from "./UserHeaders";
import UserNavbar from "./UserNavbar";
import UserHeadersInfo from "./UserHeadersInfo";

const Home = () => {
  const { authState, authDispatch } = UseAuthContext();
  const navigation: any = useNavigation();
  const [imageBase64Array, setImageBase64Array] = useState<any>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const downloadImage = async () => {
      try {
        const response = await fetch(" ");
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = () => {
          // setImageBase64(reader.result);
          setLoading(false);
        };

        reader.onerror = () => {
          setError(true);
          setLoading(false);
        };

        reader.readAsDataURL(blob);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    };

    downloadImage();
  }, []);

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
      <View style={{ backgroundColor: "white" }}>
        <Button title="logout" onPress={() => logout()} />

        {/* <Text>User Name {authUser.email}</Text>
        <Text onPress={() => console.log(authUser)}>Test</Text> */}
        <UserNavbar />
        <UserHeaders />
        <UserHeadersInfo />
      </View>
    );
  } else {
    return (
      <View>
        <UserNavbar />
        <UserHeaders />
        <UserHeadersInfo />
        {/* <Text onPress={() => console.log(authUser)}>Logged out s</Text> */}
      </View>
    );
  }
};

export default Home;
