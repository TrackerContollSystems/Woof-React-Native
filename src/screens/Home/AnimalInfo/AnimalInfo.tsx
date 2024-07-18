import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import AnimalEditModal from "../../COMPONENTS/Modals/AnimalEditModal";
import { FontAwesome } from "@expo/vector-icons";
import GenericInput from "../../COMPONENTS/FormInputs/GenericInput";
import GenericButton from "../../COMPONENTS/Buttons/GenericButtons";
import { UseUiContext } from "../../../Contexts/UiContext";
import { useRoute } from "@react-navigation/native";
import {
  UpdateAnimalBirth,
  UpdateAnimalBreed,
  UpdateAnimalColor,
  UpdateAnimalName,
  UpdateAnimalSpecie,
  UpdateAnimalSterilization,
} from "../../../API/User/UpdateAnimalInfo";
import { AnimalTypes } from "../../../Types/AnimalTypes";
import { useMutation } from "@tanstack/react-query";

export default function AnimalInfo() {
  const { colors } = UseUiContext();

  const route = useRoute();
  // const {  name , birthDate, specie,breed, gender,color,genderId, animalId, icon} = route.params.data as AnimalTypes ;
  const {
    name,
    birthDate,
    specie,
    breed,
    gender,
    color,
    genderId,
    animalId,
    icon,
  } = (route.params?.data || {}) as AnimalTypes;

  const [modalVisible, setModalVisible] = useState(false);

  const [currentValue, setCurrentValue] = useState<string | null | number>(
    null
  );
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState("");

  const [animalInfoEdit, setAnimalInfoEdit] = useState<AnimalTypes>({
    animalId: animalId,
    name: name,
    birthDate: birthDate,
    specie: specie,
    breed: breed,
    color: color,
    gender: gender,
    genderId: genderId,
    icon: icon,
  });
  
  const handleAnimalInfoEdit = (val: string | null | number, type: string) => {
    setAnimalInfoEdit((prevState) => ({
      ...prevState,
      [type]: val,
    }));
  }
  
  const openModal = (value: string | null | number, title: string) => {
    setCurrentValue(value);
    setModalTitle(title);
    setModalVisible(true);
  };

  // const openModal = (field: string, title: string) => {
  //   setCurrentField(field);
  //   setModalTitle(title);
  //   setModalVisible(true);
  // };

  const breedMutation = useMutation({
    mutationFn: ({ animalId, field }: { animalId: any; field: any }) => {
      return UpdateAnimalBreed(animalId, field);
    },
    onSuccess(res) {
      console.log(res);
    },
    onError(err) {
      console.log(err);
    },
  });

  const handleBreedMutation = async (animalId: any, field: any) => {
    console.log(animalId, field);
    await breedMutation.mutateAsync(animalId, field);
  };
  const handleSave = async (caseTitle: string) => {
    try {
      setModalVisible(false);
      switch (caseTitle) {
        case "Name":
          await UpdateAnimalName(animalId, animalInfoEdit.name);
          break;
        case "Date Of Birth":
          await UpdateAnimalBirth(animalId, animalInfoEdit.birthDate);
          break;
        case "Species":
          await handleBreedMutation(animalId, animalInfoEdit.specie);
          break;
        case "Breed":
          await UpdateAnimalBreed(animalId, animalInfoEdit.breed);
          break;
        case "Color":
          await UpdateAnimalColor(animalId, animalInfoEdit.color);
          break;
        default:
          break;

      }
    } catch (error) {
      console.error("Failed to update animal info:", error);
    }
  };

  const selectGender = (selectedGender: string) => {
    setAnimalInfoEdit((state: AnimalTypes) => ({
      ...state,
      gender: selectedGender,
    }));
  };

  // const selectSterilization = (status: string) => {

  //   UpdateAnimalSterilization(data.animalId, status);
  //  setAnimalInfoEdit((state:AnimalTypes)=> {
  //   ...state ,
  //  })
  // };
  const fields = [
    // { title:  name, value: animalInfoEdit.name, caseType:"Name"  },
    { title: name, value: "name", caseType: "Name" },
    { title: birthDate, value: "birthDate", caseType: "Date Of Birth" },
    { title: specie, value: "specie", caseType: "Species" },
    { title: breed, value: "breed", caseType: "Breed" },
    { title: color, value: "color", caseType: "Color" },
  ];
  return (
    <SafeAreaView>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.backgroundColor }]}
      >
        <View style={styles.profileContainer}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 45,
              marginTop: 10,
            }}
            source={{ uri: icon }}
          />
        </View>

        <View>
          {fields.map((field, index) => (
            <GenericInput
              key={index}
              title={field.title ? field.title : field.caseType}
              // value={field.value}
              value={animalInfoEdit[field.value]}
              onPress={() => openModal(field.value, field.caseType)}
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

          {/* <View style={styles.sterilizationContainer}>
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
          </View> */}
        </View>

        <View>
          <Text style={[styles.idstyle, { color: colors.textColor }]}>
            Does it have any special features?
          </Text>
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
          <Text style={[styles.idstyle, { color: colors.textColor }]}>
            Important Information
          </Text>
          <GenericButton
            buttonStyles={styles.buttonsFeature}
            textStyle={styles.buttonTextsFeature}
            title="Get Access"
            fun={() => console.log("Get Access for important information")}
          />
          <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
            Enter important information that will help the finder pay attention
            to the pet
          </Text>
        </View>
        <View>
          <Text style={[styles.idstyle, { color: colors.textColor }]}>
            Medical Card
          </Text>
          <GenericButton
            buttonStyles={styles.buttonsFeature}
            textStyle={styles.buttonTextsFeature}
            title="Get Access"
            fun={() => console.log("Get Access for medical card")}
          />
          <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
            Add information about vaccinations, allergies or other...
          </Text>
          <Text></Text>
        </View>

        <AnimalEditModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          title={modalTitle}
          value={currentValue}
          // value={animalInfoEdit.specie} 
          setValue={handleAnimalInfoEdit}
          // value={animalInfoEdit[currentField]}
          // field={currentField}
        />
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 15,
    fontWeight: "bold",
    fontSize: 16,
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
    borderColor: "grey",
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
