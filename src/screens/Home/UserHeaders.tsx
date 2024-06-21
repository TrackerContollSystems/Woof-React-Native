import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import {
  GetReferenceAnimalPhotos,
  GetUserAnimalsRequest,
} from "../../API/ReferenceData/GetAllAnimalicons";
import { UseAuthContext } from "../../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import AnimalInfo from "./AnimalInfo/AnimalInfo";



export default function UserHeaders() {
  const { authState } = UseAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [animals, setAnimals] = useState<
    { name: string; icon: string | ArrayBuffer | null }[]
  >([]);
  const [imageBase64Array, setImageBase64Array] = useState<
    (string | ArrayBuffer | null)[]
  >([]);

  const navigation = useNavigation();

  const referenceaAnimalData = useQuery({
    queryKey: ["get-animals-reference"],
    queryFn: GetReferenceAnimalPhotos,
  });
  const animalData = useQuery({
    queryKey: ["get-user-animals"],
    queryFn: GetUserAnimalsRequest,
  });

  useEffect(() => {
    const ImageFetch = async () => {
      if (referenceaAnimalData.isSuccess) {
        for (let i = 0; i < referenceaAnimalData.data.length; i++) {
          const response = await fetch(referenceaAnimalData.data[i]);
          const blob = await response.blob();
          const reader = new FileReader();
          reader.onloadend = () => {
            setImageBase64Array((prev) => [...prev, reader.result]);
          };
          reader.readAsDataURL(blob);
        }
      }
    };
    ImageFetch();
  }, [referenceaAnimalData.isSuccess]);

  useEffect(() => {
    if (animalData.isSuccess) {
      // setAnimals(animalData.data);
    }
  }, [animalData.isSuccess]);

  const handleSaveAnimal = () => {
    if (newAnimalName && selectedIcon !== null) {
      const newAnimal = {
        name: newAnimalName,
        icon: imageBase64Array[selectedIcon],
      };
      setAnimals((prev) => [...prev, newAnimal]);
      setNewAnimalName("");
      setSelectedIcon(null);
      setModalVisible(false);

      navigation.navigate("AnimalInfo");
    }
  };

  if (referenceaAnimalData.isPending) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>My Animals</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {animals.length >= 1 &&
          animals.map((animal, index) => (
            <View key={index} style={styles.animalContainer}>
              <Image
                style={{ width: 100, height: 100 }}
                source={{ uri: animal.icon as string }}
              />
              <Text style={styles.animalText}>{animal.name}</Text>
            </View>
          ))}
        <TouchableOpacity
          style={styles.animalContainer}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add-circle-sharp" size={100} color="green" />
          <Text style={styles.animalText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.containers}>
          <Text style={styles.bigText}>Advertisement</Text>
          <Text style={styles.smallText}>small textsmall</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.bigText}>Advertisement</Text>
          <Text style={styles.smallText}>small textsmall</Text>
        </View>
        <View style={styles.containers}>
          <Text style={styles.bigText}>Advertisement</Text>
          <Text style={styles.smallText}>small textsmall</Text>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(false);
              Keyboard.dismiss();
            }}
          >
            <View style={styles.modalContainer}>
              <TouchableWithoutFeedback onPress={() => {}}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add New Animal</Text>

                  <Foundation name="guide-dog" size={200} color="grey" />
                  <Text style={{ right: 120 }}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter animal name"
                    value={newAnimalName}
                    onChangeText={setNewAnimalName}
                  />
                  <View style={styles.iconContainer}>
                    {imageBase64Array.length >= 1 &&
                      imageBase64Array.map((animal, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.iconWrapper,
                            selectedIcon === index && styles.selectedIcon,
                          ]}
                          onPress={() => setSelectedIcon(index)}
                        >
                          <Image
                            style={{ width: 80, height: 80 }}
                            source={{ uri: animal as string }}
                          />
                        </TouchableOpacity>
                      ))}
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={handleSaveAnimal}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
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
    backgroundColor: "white",
    padding: 20,
    borderRadius: 25,
    marginTop: 20,
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
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  smallText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  iconWrapper: {
    margin: 5,
  },
  selectedIcon: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
