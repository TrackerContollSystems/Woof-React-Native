import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function UserHeaders() {
  const animals = [
    { name: "cat", label: "Cat" },
    { name: "dog", label: "Dog" },
    { name: "cow", label: "Cow" },
    { name: "horse-variant", label: "Horse" },
    { name: "donkey", label: "Donkey" },
    { name: "sheep", label: "Sheep" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Animals</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {animals.map((animal, index) => (
          <View key={index} style={styles.animalContainer}>
            <MaterialCommunityIcons
              name={animal.name}
              size={100}
              color="grey"
            />
            <Text style={styles.animalText}>{animal.label}</Text>
          </View>
        ))}
        <View style={styles.animalContainer}>
          <Ionicons name="add-circle-sharp" size={100} color="green" />
          <Text style={styles.animalText}>Add</Text>
        </View>
      </ScrollView>

      <View style={styles.containers}>
        <Text style={styles.bigText}>Big Text Animal ID</Text>
        <Text style={styles.smallText}>small textsmall</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  scrollViewContent: {
    alignItems: "center",
  },
  animalContainer: {
    alignItems: "center",
    marginRight: 10,
  },
  animalText: {
    fontSize: 12,
    marginTop: 1,
  },

  containers: {
    backgroundColor: "orange",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
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
});
