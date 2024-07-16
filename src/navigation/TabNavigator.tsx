import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Map from "../screens/Map/Map";
import { FontAwesome6 } from "@expo/vector-icons";
import { UseAuthContext } from "../Contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { UseUiContext } from "../Contexts/UiContext";

const TabNavigator = () => {
  const navigation: any = useNavigation();
  const state = useNavigationState((state) => state);
  const { authState } = UseAuthContext();
  const currentRoute = state?.routes ? state.routes[state.index].name : "";

  const { colors } = UseUiContext();

  useEffect(() => {
    console.log(currentRoute);
  }, [currentRoute]);

  const getColor = (routeName: string) =>
    routeName === currentRoute ? colors.textColor : "grey";

  if (
    authState.authUser &&
    authState.authUser.email &&
    currentRoute != "Enter"
  ) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.backgroundColor,
            borderTopColor: colors.brandGray,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Home")}
        >
        
          <Image
            source={require("../assets/TabNavigateIcons/kennel.png")} 
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
        
         
          {/* <Entypo name="home" size={24} color={getColor("Home")} /> */}
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
         <Image
            source={require("../assets/TabNavigateIcons/chat.png")} 
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
          <Text style={[styles.btn, { color: getColor("Subscription") }]}>
            Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Map")}
        >
          <Image
            source={require("../assets/TabNavigateIcons/location.png")} 
            style={{width: 52, height: 30}}
            // resizeMode="contain"
          />
          <Text style={[styles.btn, { color: getColor("Map") }]}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("Match")}
        >
         <Image
            source={require("../assets/TabNavigateIcons/animal-therapy.png")} 
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
          <Text style={[styles.btn, { color: getColor("Match") }]}>
            Match
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate("UserSettings")}
        >
         <Image
            source={require("../assets/TabNavigateIcons/application.png")} 
            style={{width: 30, height: 30}}
            resizeMode="contain"
          />
          <Text style={[styles.btn, { color: getColor("UserSettings") }]}>
            More
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
    borderTopWidth: 0.5,
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
  imagePhoto: {
    fontSize: 12
  }
});

export default TabNavigator;
