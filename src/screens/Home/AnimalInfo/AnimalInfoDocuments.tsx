import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function AnimalInfoDocuments() {
  return (
    <View style={styles.container}>
      <View style={styles.iconsRow}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="qrcode-scan" size={34} color="black" />
          <Text style={styles.iconText}>Activate QR Code</Text>
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="dog" size={94} color="black" />
        </View>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="search-web" size={34} color="black" />
          <Text style={styles.iconText}>Announce a search</Text>
        </View>
      </View>
      <View style={styles.mainContainer}>
      <View style={styles.containers}>
        <AntDesign name="exclamationcircle" size={54} color="green" />
        <Text style={styles.smallText}>Notes</Text>
      </View>
      <View style={styles.containers}>
        <AntDesign name="calendar" size={54} color="black" />
        <Text style={styles.smallText}>Map</Text>
      </View>
      <View style={styles.containers}>
        <MaterialCommunityIcons name="list-status" size={54} color="black" />
        <Text style={styles.smallText}>Documents</Text>
      </View>
      <View style={styles.containers}>
        <MaterialCommunityIcons name="qrcode-scan" size={54} color="black" />
        <Text style={styles.smallText}>The Animal Is Lost</Text>
      </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#f0f0f0", 
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,

    textAlign: "center",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },

  containers: {
    width: "45%",
    backgroundColor: "rgb(216, 255, 217)",
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
