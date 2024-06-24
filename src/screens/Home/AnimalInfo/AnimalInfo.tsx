import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  Entypo,
  Fontisto,
} from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import AnimalIdentifier from "./AnimalIdentifier";
import styles from "./AnimalInfoStyle";
import CustomModal from "./ModalAnimal";

export default function AnimalInfo() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [gender, setGender] = useState("");
  const [color, setColor] = useState("");
  const [registrationDate, setRegistrationDate] = useState("");
  const [sterilization, setSterilization] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  // const [currentField, setCurrentField] = useState("");
  const [currentField, setCurrentField] = useState<(value: string) => void>(() => () => {});
  const [currentValue, setCurrentValue] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleMicrochipPress = () => {
    console.log("Microchip button pressed");
  };

  const handleQRCodePress = () => {
    console.log("QR Code button pressed");
  };

  const openModal = (fieldSetter: any, value: any, title: string) => {
    setCurrentField(() => fieldSetter);
    setCurrentValue(value);
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleSave = () => {
    currentField(currentValue);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome
          name="user-circle"
          size={80}
          color="orange"
          style={styles.icon}
        />
        <View style={styles.textContainer}>
          <Text style={styles.mainText}>
            <Text>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.{" "}
            </Text>
            <Text>Consectetur et fugiat dicta velit, </Text>
            <Text>molestias</Text>
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          console.log("Button pressed");
        }}
      >
        <Text style={styles.buttonText}>View Publication</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.idstyle}>Identifiers</Text>

        {/* <TouchableOpacity style={styles.buttons} onPress={handleMicrochipPress}>
          <FontAwesome
            name="microchip"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonTexts}>Microchip</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.buttons} onPress={handleQRCodePress}>
          <FontAwesome
            name="qrcode"
            size={24}
            color="white"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonTexts}>QR Code</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity> */}

        <AnimalIdentifier title="Microchip" onPress={handleMicrochipPress} />
        <AnimalIdentifier title="QR Code" onPress={handleQRCodePress} />

      </View>
      <View>
        <Text style={styles.idstyle}>Does it have any special features?</Text>

        <TouchableOpacity style={styles.buttonsFuature}>
          <Text style={styles.buttonTextsFueture}>Get Access</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
          Fill in the information about the pet completely
        </Text>
      </View>
      <View>
        <Text style={styles.idstyle}>Information about the pet</Text>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setName, name, "Name")}
        >
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={[styles.buttonTexts, { color: name ? "grey" : "red" }]}>
            Name
          </Text>

          <View style={{ flexDirection: "row", right: 80 }}>
            {name ? (
              <Text style={{ color: "black" }}>{name}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setDob, dob, "Date Of Birth")}
        >
          <FontAwesome
            name="birthday-cake"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={[styles.buttonTexts, { color: dob ? "grey" : "red" }]}>
            Date Of Birth
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {dob ? (
              <Text style={{ color: "black" }}>{dob}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setSpecies, species, "Species")}
        >
          <Entypo
            name="baidu"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text
            style={[styles.buttonTexts, { color: species ? "grey" : "red" }]}
          >
            Species
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {species ? (
              <Text style={{ color: "black" }}>{species}</Text>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => openModal(setSpecies, species, "Species")}
                  style={styles.addButton}
                >
                  <Ionicons name="add" size={16} color="green" />
                  <Text style={{ color: "green" }}>Add</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setBreed, breed, "Breed")}
        >
          <MaterialCommunityIcons
            name="dog-side"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={[styles.buttonTexts, { color: breed ? "grey" : "red" }]}>
            Breed
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {breed ? (
              <Text style={{ color: "black" }}>{breed}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setGender, gender, "Gender")}
        >
          <MaterialCommunityIcons
            name="gender-male-female"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text
            style={[styles.buttonTexts, { color: gender ? "grey" : "red" }]}
          >
            Gender
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {gender ? (
              <Text style={{ color: "black" }}>{gender}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setColor, color, "Color")}
        >
          <MaterialIcons
            name="invert-colors"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonTexts, { color: color ? "grey" : "red" }]}>
            Color
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {color ? (
              <Text style={{ color: "black" }}>{color}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() =>
            openModal(
              setRegistrationDate,
              registrationDate,
              "Registration Date"
            )
          }
        >
          <Fontisto
            name="date"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text
            style={[
              styles.buttonTexts,
              { color: registrationDate ? "grey" : "red" },
            ]}
          >
            Registration Date
          </Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            {registrationDate ? (
              <Text style={{ color: "black" }}>{registrationDate}</Text>
            ) : (
              <>
                <Ionicons name="add" size={16} color="green" />
                <Text style={{ color: "green" }}>Add</Text>
              </>
            )}
          </View>
        </TouchableOpacity>
        <View>
          <Text style={styles.idstyle}>Important Information</Text>

          <TouchableOpacity style={styles.buttonsFuature}>
            <Text style={styles.buttonTextsFueture}>Get Access</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
            Enter important information that will help the finder pay attention
            to the pet
          </Text>
        </View>
        <View>
          <Text style={styles.idstyle}>Medical Card</Text>

          <TouchableOpacity style={styles.buttonsFuature}>
            <Text style={styles.buttonTextsFueture}>Get Access</Text>
          </TouchableOpacity>
          <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
            Add information about vaccinations, allergies or other similar
            habits
          </Text>
        </View>
        <View>
          <Text style={styles.idstyle}>Veterinary procedures</Text>
          <TouchableOpacity
            style={styles.buttonsInformation}
            onPress={() =>
              openModal(setSterilization, sterilization, "Sterilization")
            }
          >
            <MaterialIcons
              name="local-pharmacy"
              size={24}
              color="black"
              style={styles.buttonIcon}
            />

            <Text
              style={[
                styles.buttonTexts,
                { color: sterilization ? "grey" : "red" },
              ]}
            >
              Sterilization
            </Text>
            <View style={{ flexDirection: "row", right: 80 }}>
              {sterilization ? (
                <Text style={{ color: "black" }}>{sterilization}</Text>
              ) : (
                <>
                  <Ionicons name="add" size={16} color="green" />
                  <Text style={{ color: "green" }}>Add</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Text style={styles.deleteButton}>Delete Account</Text>
      </TouchableOpacity>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        title={modalTitle}
        value={currentValue}
        setValue={setCurrentValue}
      />

      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{modalTitle}</Text>
            {modalTitle === "Species" && (
              <RNPickerSelect
                onValueChange={(value) => setCurrentValue(value)}
                items={[
                  { label: "Dog", value: "Dog" },
                  { label: "Cat", value: "Cat" },
                ]}
                value={currentValue}
                placeholder={{ label: "Click select species...", value: null }}
              />
            )}
            {modalTitle === "Gender" && (
              <RNPickerSelect
                onValueChange={(value) => setCurrentValue(value)}
                items={[
                  { label: "Male", value: "Male" },
                  { label: "Female", value: "Female" },
                ]}
                value={currentValue}
                placeholder={{ label: "Click select gender...", value: null }}
              />
            )}
            {modalTitle !== "Species" && modalTitle !== "Gender" && (
              <TextInput
                style={styles.modalInput}
                value={currentValue}
                onChangeText={(text) => setCurrentValue(text)}
              />
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonTexts}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     padding: 7,
//     backgroundColor: "white",
//   },
//   profileContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   icon: {
//     marginRight: 10,
//   },
//   textContainer: {
//     flex: 1,
//   },
//   mainText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     paddingBottom: 5,
//   },
//   button: {
//     backgroundColor: "green",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     marginHorizontal: 10,
//     borderRadius: 50,
//     marginTop: 10,
//   },
//   buttons: {
//     backgroundColor: "rgb(232, 255, 233)",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     marginTop: 1,
//   },
//   buttonsFuature: {
//     backgroundColor: "#eff0ff",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     marginTop: 1,
//     borderWidth: 2,
//     borderColor: "purple",
//     borderStyle: "dashed",
//   },
//   buttonsInformation: {
//     backgroundColor: "rgb(232, 255, 233)",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     marginTop: 1,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   buttonTexts: {
//     color: "red",
//     fontSize: 15,
//     fontWeight: "bold",
//     flex: 7,
//   },
//   buttonTextsFueture: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "purple",
//   },
//   idstyle: {
//     display: "flex",
//     fontWeight: "bold",
//     marginTop: 20,
//     padding: 5,
//   },
//   buttonIcon: {
//     marginLeft: 10,
//     color: "black",
//     flex: 1,
//   },
//   deleteButton: {
//     fontSize: 20,
//     padding: 15,
//     color: "red",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalView: {
//     width: 300,
//     padding: 20,
//     backgroundColor: "white",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   modalInput: {
//     width: "100%",
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   modalButtons: {
//     flexDirection: "row",
//     left: 75,
//   },
//   modalButton: {
//     padding: 10,
//   },
//   modalButtonText: {
//     fontSize: 16,
//     color: "blue",
//   },
//   modalButtonTexts: {
//     fontSize: 16,
//     color: "red",
//   },
//   addButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
