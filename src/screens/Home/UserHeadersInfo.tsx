import { View, Text, Platform, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function UserHeadersInfo() {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.container}>
        <AntDesign name="exclamationcircle" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>small</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <AntDesign name="calendar" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>small</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <MaterialCommunityIcons name="list-status" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>small</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <MaterialCommunityIcons name="qrcode-scan" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>small</Text>
      </TouchableOpacity>
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
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  smallText: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
});
