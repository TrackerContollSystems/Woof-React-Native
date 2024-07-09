import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import CustomModal from "./ModalAnimal";
import { FontAwesome } from "@expo/vector-icons";
import GenericInput from "../../COMPONENTS/FormInputs/GenericInput";
import GenericButton from "../../COMPONENTS/Buttons/GenericButtons";
import { UseUiContext } from "../../../Contexts/UiContext";

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
  const { colors } = UseUiContext();

  const openModal = (
    fieldSetter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
    title: string
  ) => {
    setCurrentField(() => fieldSetter);
    setCurrentValue(value);
    setModalTitle(title);
    setModalVisible(true);
  };

  const handleSave = () => {
    currentField(currentValue);
    setModalVisible(false);
  };

  const fields = [
    { title: "Name", value: name, setter: setName },
    { title: "Date Of Birth", value: dob, setter: setDob },
    { title: "Species", value: species, setter: setSpecies },
    { title: "Breed", value: breed, setter: setBreed },
    { title: "Color", value: color, setter: setColor },
    {
      title: "Registration Date",
      value: registrationDate,
      setter: setRegistrationDate,
    },
  ];

  const selectGender = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const selectSterilization = (status: string) => {
    setSterilization(status);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <FontAwesome
          name="user-circle"
          size={100}
          color="orange"
          style={styles.icon}
        />
      </View>

      <View>
        {fields.map((field, index) => (
          <GenericInput
            key={index}
            title={field.title}
            value={field.value}
            onPress={() => openModal(field.setter, field.value, field.title)}
          />
        ))}
        <View style={styles.sterilizationContainer}>
          <Text style={styles.sterilizationLabel}>Gender</Text>
          <View style={styles.sterilizationButtons}>
            <TouchableOpacity
              style={[
                styles.sterilizationButton,
                styles.sterilizationButtonLeft,
                gender === "Boy" && styles.sterilizationButtonSelected,
              ]}
              onPress={() => selectGender("Boy")}
            >
              <Text
                style={[
                  styles.sterilizationButtonText,
                  gender === "Boy" && styles.sterilizationButtonTextSelected,
                ]}
              >
                Boy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sterilizationButton,
                styles.sterilizationButtonRight,
                gender === "Girl" && styles.sterilizationButtonSelected,
              ]}
              onPress={() => selectGender("Girl")}
            >
              <Text
                style={[
                  styles.sterilizationButtonText,
                  gender === "Girl" && styles.sterilizationButtonTextSelected,
                ]}
              >
                Girl
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sterilizationContainer}>
          <Text style={styles.sterilizationLabel}>Sterilization</Text>
          <View style={styles.sterilizationButtons}>
            <TouchableOpacity
              style={[
                styles.sterilizationButton,
                styles.sterilizationButtonLeft,
                sterilization === "Yes" && styles.sterilizationButtonSelected,
              ]}
              onPress={() => selectSterilization("Yes")}
            >
              <Text
                style={[
                  styles.sterilizationButtonText,
                  sterilization === "Yes" &&
                    styles.sterilizationButtonTextSelected,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.sterilizationButton,
                styles.sterilizationButtonRight,
                sterilization === "No" && styles.sterilizationButtonSelected,
              ]}
              onPress={() => selectSterilization("No")}
            >
              <Text
                style={[
                  styles.sterilizationButtonText,
                  sterilization === "No" &&
                    styles.sterilizationButtonTextSelected,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View>
        <GenericButton
          buttonStyles={styles.buttonsCreate}
          textStyle={styles.buttonTextsCreate}
          title="Create Pet Profile"
          fun={() => console.log("")}
        />
      </View>

      <View>
        <Text style={styles.idstyle}>Does it have any special features?</Text>
        <GenericButton
          buttonStyles={styles.buttonsFeature}
          textStyle={styles.buttonTextsFeature}
          title="Get Access"
          fun={() => console.log("Get Access for special features")}
        />
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
          Fill in the information about the pet completely
        </Text>
      </View>
      <View>
        <Text style={styles.idstyle}>Important Information</Text>
        <GenericButton
          buttonStyles={styles.buttonsFeature}
          textStyle={styles.buttonTextsFeature}
          title="Get Access"
          fun={() => console.log("Get Access for important information")}
        />
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
          Enter important information that will help the finder pay attention to
          the pet
        </Text>
      </View>
      <View>
        <Text style={styles.idstyle}>Medical Card</Text>
        <GenericButton
          buttonStyles={styles.buttonsFeature}
          textStyle={styles.buttonTextsFeature}
          title="Get Access"
          fun={() => console.log("Get Access for medical card")}
        />
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

const styles = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: "white",
  },
  profileContainer: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonsCreate: {
    backgroundColor: "#2C3F51",
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonTextsCreate: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    marginRight: 10,
  },
  idstyle: {
    display: "flex",
    fontWeight: "bold",
    marginTop: 20,
    padding: 5,
  },
  buttonsFeature: {
    backgroundColor: "#2C3F51",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 1,
    borderWidth: 3,
    borderColor: "white",
  },
  buttonTextsFeature: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },

  sterilizationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E4E4E4",
  },
  sterilizationLabel: {
    fontSize: 18,
    color: "grey",
  },
  sterilizationButtons: {
    flexDirection: "row",
  },
  sterilizationButton: {
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E4E4E4",
    backgroundColor: "white",
    width: 65,
    height: 38,
  },
  sterilizationButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  sterilizationButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  sterilizationButtonSelected: {
    backgroundColor: "#2C3F51",
  },
  sterilizationButtonText: {
    fontSize: 18,
    color: "black",
  },
  sterilizationButtonTextSelected: {
    color: "white",
  },
});
