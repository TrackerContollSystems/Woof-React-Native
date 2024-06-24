import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";


interface AnimalIdentifierProps {
  title: string; 
  onPress: () => void; 
}

const AnimalIdentifier: React.FC<AnimalIdentifierProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.buttons} onPress={onPress}>
      <FontAwesome
        name={title === "Microchip" ? "microchip" : "qrcode"}
        size={24}
        color="white"
        style={styles.buttonIcon}
      />
      <Text style={styles.buttonTexts}>{title}</Text>
      <View style={{ flexDirection: "row", right: 80 }}>
        <Ionicons name="add" size={16} color="green" />
        <Text style={{ color: "green" }}>Add</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: "rgb(232, 255, 233)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonTexts: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    flex: 7,
  },
  buttonIcon: {
    marginLeft: 10,
    color: "black",
    flex: 1,
  },
});

export default AnimalIdentifier;
