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
import {
 
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReferenceAnimalPhotos } from "../../API/ReferenceData/GetAllAnimalicons";
 import { useNavigation } from "@react-navigation/native";
import { GetAnimalDetailsByUser } from "../../API/User/GetAnimalDetailsByUserRequest";
import { CreateAnimalRequest } from "../../API/User/CreateAnimalRequest";
import { UsePhotoContext } from "../../Contexts/PhotoPickerContext";
import AnimalModalLoadingSkeleton from "../COMPONENTS/Skeleton/AnimalModalLoadingSkeleton";
import AnimalPhotoLoader from "./AnimalInfo/Components/AnimalPhotoLoader";
import LoadingAnimation from "../COMPONENTS/animations/LoadingAnimation";
import { UseUiContext } from "../../Contexts/UiContext";

export default function UserMain() {
 
  const { handlePickImage, photoFromGallery, setPhotoFromGallery } =
    UsePhotoContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [newAnimalName, setNewAnimalName] = useState("");
  const [newAnimalIcon, setNewIcon] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<number | null>(null);
 
 
  const [modalLoading, setModalLoading] = useState(true);
 
  const navigation: any = useNavigation();
  const { colors } = UseUiContext();

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
      queryClient.invalidateQueries({ queryKey: ["get-user-animals"] });
      setNewAnimalName("");
      setSelectedIcon(null);
      setModalVisible(false);
      setPhotoFromGallery(null);
      navigation.navigate("AnimalInfoDocuments", {});
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleSaveAnimal = async () => {
    const obj = {
      Name: newAnimalName,
      Icon: newAnimalIcon,
      File: null,
    };
 

    if (photoFromGallery?.assets[0]) {
      obj.File = photoFromGallery?.assets[0];
    }

    await mutation.mutateAsync(obj);
    // navigation.navigate("AnimalInfoDocuments");
  };

  useEffect(() => {
    if (modalVisible) {
      setModalLoading(true);
      setTimeout(() => {
        setModalLoading(false);
      }, 1000);
    }
  }, [modalVisible]);

 

  return (
    <View style={styles.container}>
      <Text onPress={() => console.log(animalData.data)} style={[styles.text, { color: colors.textColor }]}>
        My Animals
      </Text>
      {mutation.isPending ||
        animalData.isPending ||
        (referenceaAnimalData.isPending && (
          <View style={{ position: "absolute", zIndex: 10000, left: "35%" }}>
            <LoadingAnimation />
          </View>
        ))}
      <View style={styles.animalcontainet}>
        <TouchableOpacity
          style={[styles.animalContainer, {backgroundColor: colors.backgroundColor}]}
          onPress={() => setModalVisible(true)}
        >
          {/* <Ionicons name="add-circle-sharp" size={100} color={colors.buttonColor} /> */}
          <Image
            source={require("../../assets/TabNavigateIcons/paw-print.png")}
            style={{ width: 90, height: 90 }}
          />
          <Text style={[styles.animalText, { color: colors.textColor }]}>Add</Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          {animalData?.data?.length >= 1 &&
            animalData?.data?.map((animal: any, index: number) => {
              const { animalId, name, icon } = animal;
              return <AnimalPhotoLoader key={index} name={name} icon={icon}  animalId={animalId} />;
            })}
        </ScrollView>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.containers}>
          <Image source={require('../../assets/TabNavigateIcons/WhatsApp Image 2024-07-14 at 14.00.34_739ac321.jpg')} style={{width: 250, height: 100}} />
        </View>
        <View style={styles.containers}>
        <Image source={require('../../assets/TabNavigateIcons/WhatsApp Image 2024-07-14 at 14.00.34_739ac321.jpg')} style={{width: 250, height: 100}} />
        </View>
        <View style={styles.containers}>
        <Image source={require('../../assets/TabNavigateIcons/WhatsApp Image 2024-07-14 at 14.00.34_739ac321.jpg')} style={{width: 250, height: 100}} />
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
                <View style={[styles.modalContent, {backgroundColor: colors.backgroundColor}]}>
                  <Text style={[styles.modalTitle, {color: colors.textColor}]}>Add New Animal</Text>
                  {modalLoading ? (
                    <AnimalModalLoadingSkeleton />
                  ) : (
                    <>
                      <View>
                        {photoFromGallery?.assets[0]?.uri ? (
                          <View style={styles.imageWrapper}>
                            <Pressable
                              onPress={() => setPhotoFromGallery(null)}
                            >
                              <Image
                                style={{ width: 200, height: 200 }}
                                source={{ uri: photoFromGallery.assets[0].uri }}
                              />
                              <Pressable
                                style={styles.cancelButton}
                                onPress={() => setPhotoFromGallery(null)}
                              >
                                <MaterialIcons
                                  name="cancel"
                                  size={24}
                                  color="red"
                                />
                              </Pressable>
                            </Pressable>
                          </View>
                        ) : (
                          <View style={styles.imageWrapper}>
                            {newAnimalIcon ? (
                              <Pressable onPress={() => setNewIcon("")}>
                                <Image
                                  style={{ width: 200, height: 200 }}
                                  source={{ uri: newAnimalIcon }}
                                />
                                <Pressable
                                  style={styles.cancelButton}
                                  onPress={() => setNewIcon("")}
                                >
                                  <MaterialIcons
                                    name="cancel"
                                    size={24}
                                    color="red"
                                  />
                                </Pressable>
                              </Pressable>
                            ) : (
                              <TouchableOpacity
                                style={{ width: 200, height: 200 }}
                                onPress={handlePickImage}
                              >
                                <MaterialIcons
                                  name="photo-size-select-large"
                                  size={200}
                                  color="rgb(211, 210, 210)"
                                />
                              </TouchableOpacity>
                            )}
                          </View>
                        )}
                      </View>

                      <Text style={[{ right: 120 }, {color: colors.textColor}]}>Name</Text>

                      <TextInput
                        style={[styles.input, {color: colors.textColor}]}
                        placeholder="Enter animal name"
                        value={newAnimalName}
                        onChangeText={setNewAnimalName}
                      />
                      <View style={styles.iconContainer}>
                        <TouchableOpacity onPress={handlePickImage}>
                          <MaterialCommunityIcons
                            name="camera-plus-outline"
                            size={90}
                            color="rgb(211, 210, 210)"
                          />
                        </TouchableOpacity>

                        {referenceaAnimalData.isSuccess &&
                          referenceaAnimalData?.data?.length >= 1 &&
                          referenceaAnimalData?.data?.map(
                            (animal: string, index: number) => (
                              <TouchableOpacity
                                key={index}
                                style={[styles.iconWrapper]}
                                onPress={() =>
                                  selectedIcon === index
                                    ? (setSelectedIcon(null), setNewIcon(""))
                                    : (setSelectedIcon(index),
                                      setNewIcon(animal))
                                }
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
                    </>
                  )}
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
  animalcontainet: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    width: "100%",
  },
  scrollViewContent: {
    alignItems: "center",
    padding: 2,
   
  },
  animalText: {
    fontSize: 12,
    marginTop: 1,
  },
  // animalContainer: {
  //   alignItems: "center",
  //   marginRight: 1,
  // },
  animalContainer: {
    alignItems: "center",
    marginRight: 1,
    shadowColor: "grey",
    backgroundColor: "white",
    borderRadius: 5,
    shadowOffset: {
      width: 5,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    zIndex: 1000,
  },
  containers: {
    // backgroundColor: "#2C3F51",
    padding: 10,
    // borderRadius: 2,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
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
    color: "white",
  },
  smallText: {
    fontSize: 16,
    color: "white",
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
    margin: 4,
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
  imageWrapper: {
    position: "relative",
    width: 200,
    height: 200,
  },
  cancelButton: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
