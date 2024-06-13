import { Text, View, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const TabNavigator = () => {
  const navigation: any = useNavigation();

  return (
    <View>
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
      <Text
        onPress={() => navigation.navigate(`Subscription`)}
        style={styles.btn}
      >
        subscription
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "red",
    color: "white",
  },
});

export default TabNavigator;
