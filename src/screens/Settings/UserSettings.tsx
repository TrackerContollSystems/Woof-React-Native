import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Switch,
} from "react-native";
import { UseUiContext } from "../../Contexts/UiContext";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UseAuthContext } from "../../Contexts/AuthContext";

export default function UserSettings() {
  const { toggleTheme, theme } = UseUiContext();
  const { authState, authDispatch } = UseAuthContext();
  const navigation: any = useNavigation();

  const textStyle = {
    padding: 30,
    fontSize: 25,
    color: theme === "dark" ? "red" : "black",
  };

  const logout = async () => {
    await AsyncStorage.setItem("token", "");
    authDispatch({ type: "set_decoded_user", payload: {} });
    navigation.navigate(`Login`);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "lightblue", true: "white" }}
          thumbColor={theme === "dark" ? "green" : "white"}
          ios_backgroundColor="white"
          onValueChange={toggleTheme}
          value={theme === "dark"}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 300,
    top: 200,
  },
  logoutButtonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "lightblue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  toggleText: {
    marginRight: 10,
    fontSize: 16,
    color: "black",
  },
});
