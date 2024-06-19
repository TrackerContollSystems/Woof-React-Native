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
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { GetReferenceAnimalPhotos } from "../../API/ReferenceData/GetAllAnimalicons";
import { useQuery } from "@tanstack/react-query";
import {
  GetAnimalmages,
  GetUserAnimalsRequest,
} from "../../API/User/GetUserAnimals";
import { UseAuthContext } from "../../Contexts/AuthContext";
export default function UserHeaders() {
  const { authState } = UseAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [animals, setAnimals] = useState([]);
  const [imageBase64Array, setImageBase64Array] = useState<any>([]);

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
            setImageBase64Array([...animals, reader.result]);
          };
          reader.readAsDataURL(blob);
        }
      }
    };
    ImageFetch();
  }, [referenceaAnimalData.isSuccess]);

  useEffect(() => {
    console.log(animalData.data);
  }, [animalData.isSuccess]);

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
        {imageBase64Array.length >= 1 &&
          imageBase64Array.map((animal: any, index: number) => (
            <View key={index} style={styles.animalContainer}>
              {/* <MaterialCommunityIcons name={animal} size={100} color="grey" /> */}
              {/* <Text style={styles.animalText}>{animal.label}</Text>
               */}
              <Image
                style={{ width: 50, height: 50 }}
                source={{ uri: animal }}
              />
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

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Animal</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter animal name"
              value={newAnimalName}
              onChangeText={setNewAnimalName}
            />
            <View style={styles.iconContainer}>
              {/* {availableIcons.map((icon, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedIcon(icon)}
                  style={[
                    styles.iconWrapper,
                    selectedIcon === icon && styles.selectedIcon,
                  ]}
                >
                  <MaterialCommunityIcons name={icon} size={40} color="grey" />
                </TouchableOpacity>
              ))} */}
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
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
