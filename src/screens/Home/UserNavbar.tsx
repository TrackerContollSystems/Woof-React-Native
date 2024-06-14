import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserNavbar() {
  return (
    <View style={{ marginBottom: 20 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 7 }}>
        <FontAwesome name="user-circle" size={60} color="orange" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", padding: 4 }}>
            Robi Beglarashvili
          </Text>
          <Text style={{ fontSize: 14, color: "gray", padding: 4 }}>User</Text>
        </View>

        <View style={{ marginLeft: 110 }}>
          <MaterialCommunityIcons
            name="trophy-award"
            size={44}
            color="orange"
          />
          <Text style={{ fontSize: 12, color: "gray" }}>Award</Text>
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.bigText}>Big Text Animal ID</Text>
        <Text style={styles.smallText}>
          small textsmall textsmall textsmall textsmall textsmall textsmall text
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Button</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 20,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
});
