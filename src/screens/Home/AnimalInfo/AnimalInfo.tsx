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
import DatePicker from "react-native-datepicker";

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
  const [currentField, setCurrentField] = useState<(value: string) => void>(
    () => () => {}
  );
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

          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
          <View style={{ flexDirection: "row", right: 60 }}>
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
            <View style={{ flexDirection: "row", right: 60 }}>
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
    </ScrollView>
  );
}
