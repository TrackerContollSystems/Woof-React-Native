import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import styles from "./AnimalInfoStyle";
import CustomModal from "./ModalAnimal";
import { FontAwesome } from "@expo/vector-icons";

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
  const [currentField, setCurrentField] = useState<(value: string) => void>(
    () => () => {}
  );
  const [currentValue, setCurrentValue] = useState("");
  const [modalTitle, setModalTitle] = useState("");

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
      {/* <View style={styles.profileContainer}>
        <Text style={styles.title}>Animal Profile</Text>
      </View> */}
      <View style={styles.profileContainer}>
        <FontAwesome
          name="user-circle"
          size={100}
          color="orange"
          style={styles.icon}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setName, name, "Name")}
        >
          <Text style={[styles.buttonTexts]}>Name</Text>
          {name && <Text style={styles.buttonValue}>{name}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setDob, dob, "Date Of Birth")}
        >
          <Text style={[styles.buttonTexts]}>Date Of Birth</Text>
          {dob && <Text style={styles.buttonValue}>{dob}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setSpecies, species, "Species")}
        >
          <Text style={[styles.buttonTexts]}>Species</Text>
          {species && <Text style={styles.buttonValue}>{species}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setBreed, breed, "Breed")}
        >
          <Text style={[styles.buttonTexts]}>Breed</Text>
          {breed && <Text style={styles.buttonValue}>{breed}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setGender, gender, "Gender")}
        >
          <Text style={[styles.buttonTexts]}>Gender</Text>
          {gender && <Text style={styles.buttonValue}>{gender}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() => openModal(setColor, color, "Color")}
        >
          <Text style={[styles.buttonTexts]}>Color</Text>
          {color && <Text style={styles.buttonValue}>{color}</Text>}
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
          <Text style={[styles.buttonTexts]}>Registration Date</Text>
          {registrationDate && (
            <Text style={styles.buttonValue}>{registrationDate}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={() =>
            openModal(setSterilization, sterilization, "Sterilization")
          }
        >
          <Text style={[styles.buttonTexts]}>Sterilization</Text>
          {sterilization && (
            <Text style={styles.buttonValue}>{sterilization}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.buttonsCreate}>
          <Text style={styles.buttonTextsCreate}>Create Pet Profile</Text>
        </TouchableOpacity>
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
        <Text style={styles.idstyle}>Important Information</Text>

        <TouchableOpacity style={styles.buttonsFuature}>
          <Text style={styles.buttonTextsFueture}>Get Access</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
          Enter important information that will help the finder pay attention to
          the pet
        </Text>
      </View>
      <View>
        <Text style={styles.idstyle}>Medical Card</Text>

        <TouchableOpacity style={styles.buttonsFuature}>
          <Text style={styles.buttonTextsFueture}>Get Access</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
          Add information about vaccinations, allergies or other similar habits
        </Text>
      </View>

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
