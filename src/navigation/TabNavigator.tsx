import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Map from "../screens/Map/Map";
import { FontAwesome6 } from "@expo/vector-icons";
import { UseAuthContext } from "../Contexts/AuthContext";
import { Ionicons } from '@expo/vector-icons';

 
const TabNavigator = () => {
  const navigation: any = useNavigation();
  const state = useNavigationState((state) => state);
  const { authState } = UseAuthContext();
  const currentRoute = state?.routes ? state.routes[state.index].name : "";

  useEffect(() => {
    console.log(currentRoute);
  }, [currentRoute]);

  const getColor = (routeName: string) =>
    routeName === currentRoute ? "black" : "grey";

  if (
    authState.authUser &&
    authState.authUser.email &&
    currentRoute != "Enter"
  ) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Home")}
        >
          <Entypo name="home" size={24} color={getColor("Home")} />
          <Text style={[styles.btn, { color: getColor("Home") }]}>Home</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Subscription")}
        >
          <FontAwesome
            name="user-circle"
            size={24}
            color={getColor("User Info")}
          />
          <Text style={[styles.btn, { color: getColor("User Info") }]}>
            User Info
          </Text>
        </TouchableOpacity> */}

        {/* <Text onPress={() => navigation.navigate(`Enter`)}>VIDEO</Text>
      <Text onPress={() => navigation.navigate(`Intro`)} style={styles.btn}>
        Intro
      </Text>

      <Text onPress={() => navigation.navigate(`Signup`)} style={styles.btn}>
        Signup
      </Text>
      <Text onPress={() => navigation.navigate(`Login`)} style={styles.btn}>
        Login
      </Text>
      <Text onPress={() => navigation.navigate(`Home`)} style={styles.btn}>
        Home
      </Text> */}

        <TouchableOpacity
          onPress={() => navigation.navigate("Subscription")}
          style={styles.tab}
        >
          <MaterialIcons
            name="subscriptions"
            size={24}
            color={getColor("Subscription")}
          />
          <Text style={[styles.btn, { color: getColor("Subscription") }]}>
            Subscription
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Map")}
        >
          <FontAwesome6 name="map-location" size={24} color={getColor("Map")} />
          <Text style={[styles.btn, { color: getColor("Map") }]}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("UserSettings")}
        >
          <Ionicons name="settings-sharp" size={24} color={getColor("UserSettings")}/>
          <Text style={[styles.btn, { color: getColor("UserSettings") }]}>
            Setting 
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  tab: {
    alignItems: "center",
  },
  tabContent: {
    alignItems: "center",
  },
  btn: {
    color: "grey",
    marginTop: 5,
  },
});

export default TabNavigator;
