import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

export default function AnimalInfo() {
  const handleMicrochipPress = () => {
    console.log("Microchip button pressed");
  };

  const handleQRCodePress = () => {
    console.log("QR Code button pressed");
  };

  return (
    <View style={styles.container}>
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
       
          <View style={{flexDirection: 'row', right: 80}}>
          <Ionicons name="add" size={16} color="green" />
          <Text style={{color: 'green'}}>Add</Text>
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
          <View style={{flexDirection: 'row', right: 80}}>
          <Ionicons name="add" size={16} color="green" />
          <Text style={{color: 'green'}}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.idstyle}>Does it have any special features?</Text>

        <TouchableOpacity style={styles.buttonsFuature} >
      
          <Text style={styles.buttonTextsFueture}>Get Access</Text>
       
        </TouchableOpacity>
<Text style={{marginTop: 5, marginLeft: 5, color: 'grey'}}>Fill in the information about the pet completely</Text>

      </View>
    </View>
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
    backgroundColor: "#eff0ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 1,
  },
  buttonsFuature:{
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
    borderColor: 'purple',
    borderStyle: 'dashed',
  
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
  
    flex: 7
  },
  buttonTextsFueture:{
    fontSize: 18,
    fontWeight: "bold",
    color: 'purple',
    
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
    flex: 1
  },
});
