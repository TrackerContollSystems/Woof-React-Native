import React, { useState } from "react";
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
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const { colors } = UseUiContext();

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
    <View style={[styles.container, {backgroundColor: colors.backgroundColor} ]}>
      <View style={[styles.toggleContainer,]}>
        <Text style={styles.toggleText}>Dark Mode</Text>
        <Switch
          trackColor={{ false: "lightblue", true: "white" }}
          thumbColor={theme === "dark" ? colors.buttonColor : "white"}
          ios_backgroundColor="white"
          onValueChange={toggleTheme}
          value={theme === "dark"}
        />
      </View>

      <View style={[styles.toggleContainer]}>
        <Text style={styles.toggleText}>Notifications</Text>
        <Switch
          trackColor={{ false: "lightblue", true: "white" }}
          thumbColor={notificationsEnabled ? colors.notifications : "white"}
          ios_backgroundColor="white"
          onValueChange={() => setNotificationsEnabled(!notificationsEnabled)}
          value={notificationsEnabled}
        />
      </View>




      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 300,
    top: 400,
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
    backgroundColor: "#2C3F51",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: "100%",
    justifyContent: "space-between",
  },
  toggleText: {
  
    fontSize: 16,
    color: "white",
  },
});
