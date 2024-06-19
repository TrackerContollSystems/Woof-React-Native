import { View, Text, Platform, StyleSheet } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserHeadersInfo() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <AntDesign name="exclamationcircle" size={54} color="green" />
        <Text style={styles.smallText}>small</Text>
      </View>
      <View style={styles.container}>
        <AntDesign name="calendar" size={54} color="black" />
        <Text style={styles.smallText}>small</Text>
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name="list-status" size={54} color="black" />
        <Text style={styles.smallText}>small</Text>
      </View>
      <View style={styles.container}>
        <MaterialCommunityIcons name="qrcode-scan" size={54} color="black" />
        <Text style={styles.smallText}>small</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },

  container: {
    width: "45%",
    backgroundColor: "#eff0ff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: "#000",
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.8,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     elevation: 5,
    //   },
    // }),
  },
  smallText: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
});
