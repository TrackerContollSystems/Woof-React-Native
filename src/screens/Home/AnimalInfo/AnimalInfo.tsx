import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Fontisto } from '@expo/vector-icons';

export default function AnimalInfo() {
  const handleMicrochipPress = () => {
    console.log("Microchip button pressed");
  };

  const handleQRCodePress = () => {
    console.log("QR Code button pressed");
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

        <TouchableOpacity style={styles.buttons} onPress={handleMicrochipPress}>
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons} onPress={handleQRCodePress}>
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
        <Text style={styles.idstyle}>Information about the pet</Text>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <MaterialIcons
            name="drive-file-rename-outline"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonTexts}>Name</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <FontAwesome
            name="birthday-cake"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonTexts}>Date Of Birth</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <Entypo
            name="baidu"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonTexts}>Species</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <MaterialCommunityIcons
            name="dog-side"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />

          <Text style={styles.buttonTexts}>Breed</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <MaterialCommunityIcons
            name="gender-male-female"
            size={24}
            color="black"
            style={styles.buttonIcon}
          />
          <Text style={styles.buttonTexts}>Gender</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
       
          <MaterialIcons name="invert-colors" size={24} color="black"  style={styles.buttonIcon}/>
          <Text style={styles.buttonTexts}>Color</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
       <Fontisto name="date" size={24} color="black"  style={styles.buttonIcon}/>
          
          <Text style={styles.buttonTexts}>Registration Date</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
        <View>
        <Text style={styles.idstyle}>Important Information</Text>

        <TouchableOpacity style={styles.buttonsFuature}>
          <Text style={styles.buttonTextsFueture}>Get Access</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: 5, marginLeft: 5, color: "grey" }}>
        Enter important information that will help the finder pay attention to the pet
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
      <View>
        <Text style={styles.idstyle}>Veterinary procedures</Text>
      <TouchableOpacity
          style={styles.buttonsInformation}
          onPress={handleQRCodePress}
        >
          <MaterialIcons name="local-pharmacy" size={24} color="black"   style={styles.buttonIcon}/>

          <Text style={styles.buttonTexts}>Sterilization</Text>
          <View style={{ flexDirection: "row", right: 80 }}>
            <Ionicons name="add" size={16} color="green" />
            <Text style={{ color: "green" }}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
     
      </View>
      <TouchableOpacity >
        <Text style={styles.deleteButton}>Delete Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    backgroundColor: "white",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  mainText: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 5,
  },
  button: {
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    marginHorizontal: 10,
    borderRadius: 50,
    marginTop: 10,
  },
  buttons: {
    backgroundColor: "rgb(232, 255, 233)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonsFuature: {
    backgroundColor: "#eff0ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
    borderWidth: 2,
    borderColor: "purple",
    borderStyle: "dashed",
  },
  buttonsInformation: {
    backgroundColor: "rgb(232, 255, 233)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonTexts: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",

    flex: 7,
  },
  buttonTextsFueture: {
    fontSize: 18,
    fontWeight: "bold",
    color: "purple",
  },
  idstyle: {
    display: "flex",
    fontWeight: "bold",
    marginTop: 20,
    padding: 5,
  },
  buttonIcon: {
    marginLeft: 10,
    color: "black",
    flex: 1,
  },
  deleteButton: {
   fontSize: 20,
    padding: 15,
    color: 'red'
  }
});
