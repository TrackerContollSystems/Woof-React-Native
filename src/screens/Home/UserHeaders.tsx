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
  Pressable,
} from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReferenceAnimalPhotos } from "../../API/ReferenceData/GetAllAnimalicons";
import { UseAuthContext } from "../../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { GetAnimalDetailsByUser } from "../../API/User/GetAnimalDetailsByUserRequest";
import { CreateAnimalRequest } from "../../API/User/CreateAnimalRequest";
import { UsePhotoContext } from "../../Contexts/PhotoPickerContext";
import LoadingAnimation from "../COMPONENTS/animations/LoadingAnimation";

export default function UserHeaders() {
  const { authState } = UseAuthContext();
  const { handlePickImage, photoFromGallery, setPhotoFromGallery } =
    UsePhotoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [newAnimalIcon, setNewIcon] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
  const [animals, setAnimals] = useState<
    { name: string; icon: string | ArrayBuffer | null }[]
  >([]);
  const [imageBase64Array, setImageBase64Array] = useState<
    (string | ArrayBuffer | null)[]
  >([]);

  //   useEffect(()=>{
  //  const imageFetch = async ()=>{
  //    if(animalData.isSuccess){
  //     for(let i = 0; i <  animalData?.data.length ; i ++ ){
  //   const response = await fetch(animalData.data[i].icon)
  //   const blob = await response.blob()
  //   const reader = new FileReader();
  //   reader.onloadend= () =>{
  //     setAnimalDataWithBase64((state:any)=> [...state, {name:state.name, icon:reader.result}])
  //   }
  //   reader.readAsDataURL(blob);
  //     }   }
  //  }
  //  imageFetch()
  //   },[animalData.isSuccess])
  const navigation: any = useNavigation();

  const referenceaAnimalData = useQuery({
    queryKey: ["get-animals-reference"],
    queryFn: GetReferenceAnimalPhotos,
  });
  const animalData = useQuery({
    queryKey: ["get-user-animals"],
    queryFn: GetAnimalDetailsByUser,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (obj: any) => {
      return CreateAnimalRequest(obj);
    },
    onSuccess() {
      // navigation.navigate(`AnimalInfoDocuments`);
      navigation.navigate("AnimalInfoDocuments", { photoUri: newAnimalIcon });
      queryClient.invalidateQueries({ queryKey: ["get-user-animals"] });
      setNewAnimalName("");
      setSelectedIcon(null);
      setModalVisible(false);
      setPhotoFromGallery("");
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleSaveAnimal = async () => {
    const obj = {
      Name: newAnimalName,
      Icon: newAnimalIcon,
      File: photoFromGallery.assets[0],
    };
    await mutation.mutateAsync(obj);
  };

  if (referenceaAnimalData.isPending || !referenceaAnimalData.isSuccess) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text onPress={() => console.log(animalData.data)} style={styles.text}>
        My Animals
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {animalData?.data?.length >= 1 &&
          animalData?.data?.map((animal: any, index: number) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AnimalInfoDocuments", {
                  animalName: animal.name,
                  photoUri: animal.icon,
                })
              }
              key={index}
              style={styles.animalContainer}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 45 }}
                source={{ uri: animal.icon as string }}
              />
              <Text style={styles.animalText}>{animal.name}</Text>
            </TouchableOpacity>
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
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Add New Animal</Text>
                  {mutation.isPending && <LoadingAnimation />}
                  {photoFromGallery?.assets[0]?.uri ? (
                    <Pressable onPress={() => setPhotoFromGallery(null)}>
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: photoFromGallery.assets[0].uri }}
                      />
                    </Pressable>
                  ) : (
                    <Pressable onPress={() => setNewIcon("")}>
                      <Image
                        style={{ width: 200, height: 200 }}
                        source={{ uri: newAnimalIcon }}
                      />
                    </Pressable>
                  )}

                  <Text style={{ right: 120 }}>Name</Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Enter animal name"
                    value={newAnimalName}
                    onChangeText={setNewAnimalName}
                  />
                  <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={handlePickImage}>
                      <Ionicons name="camera" size={90} color="black" />
                    </TouchableOpacity>

                    {referenceaAnimalData?.data?.length >= 1 &&
                      referenceaAnimalData?.data?.map(
                        (animal: string, index: number) => (
                          <TouchableOpacity
                            key={index}
                            style={[
                              styles.iconWrapper,
                              selectedIcon === index && styles.selectedIcon,
                            ]}
                            onPress={() => setNewIcon(animal)}
                          >
                            <Image
                              style={{ width: 80, height: 80 }}
                              source={{ uri: animal as string }}
                            />
                          </TouchableOpacity>
                        )
                      )}
                  </View>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity
                      style={styles.buttonCancel}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.buttonSave}
                      onPress={handleSaveAnimal}
                    >
                      <Text style={styles.buttonText}>Save</Text>
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
    padding: 5,
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
  buttonSave: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "green",
  },
  buttonCancel: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    backgroundColor: "red",
  },
  imageCamera: {
    flex: 9,
    backgroundColor: "red",
    marginRight: 5,
  },
});
