import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import QRCodeScanner from "./Components/QRCodeScanner";
import { UseUiContext } from "../../../Contexts/UiContext";

interface RouteParams {
  photoUri: string;
  animalName: string;
}

export default function AnimalInfoDocuments() {
  const navigation: any = useNavigation();
  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { photoUri, animalName } = route.params;

  const [scanned, setScanned] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const { colors } = UseUiContext();
  const navigateToMap = () => {
    navigation.navigate("Map"); 
  };

  const AwardIcons = [
    { name: "trophy-award", component: MaterialCommunityIcons },
    { name: "award", component: FontAwesome5 },
  ];

  const toggleIconSelection = (iconName: string) => {
    const isSelected = selectedIcons.includes(iconName);
    if (isSelected) {
      setSelectedIcons(selectedIcons.filter((name) => name !== iconName));
    } else {
      setSelectedIcons([...selectedIcons, iconName]);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: animalName });
  }, [navigation, animalName]);

  const handleScan = (data: string) => {
    setScanned(false);
    console.log(`Scanned data: ${data}`);
  };

  const handleActivateScanner = () => {
    setScanned(true);
  };

  const handleCloseScanner = () => {
    setScanned(false);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.backgroundColor}]}>
      {scanned ? (
        <QRCodeScanner onScanned={handleScan} />
      ) : (
        <>
          <ScrollView>
            <View style={styles.iconsRow}>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleActivateScanner}
              >
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={34}
                  color={colors.buttonColor}
                />
                <Text style={[styles.iconText, { color: colors.textColor }]}>Activate QR Code</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("AnimalInfo", { photoUri, animalName })}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 45,
                    marginTop: 10,
                  }}
                  source={{ uri: photoUri }}
                />
                {/* <MaterialCommunityIcons  onPress={() => navigation.navigate("AnimalInfo")} name="dog" size={94} color="black" /> */}
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconContainer}>
                <AntDesign name="notification" size={34} color={colors.buttonColor} />
                <Text style={[styles.iconText, { color: colors.textColor }]}>The Animal Is Lost</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.texts , { color: colors.textColor }]}>Award</Text>
              <Text style={styles.achievements}>Your pet's achievements</Text>

              <View style={[styles.award,  {backgroundColor: colors.cardColor}]}>
                {AwardIcons.map((icon, index) => (
                  <Pressable
                    key={index}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                      },
                      styles.iconContainer,
                    ]}
                    onPress={() => toggleIconSelection(icon.name)}
                  >
                    <icon.component
                      name={icon.name}
                      size={64}
                      color={
                        selectedIcons.includes(icon.name) ? "gold" : "grey"
                      }
                    />
                  </Pressable>
                ))}
              </View>
            </View>
            <Text style={[styles.smallTexts, { color: colors.textColor }]}>Care</Text>
            <View style={styles.mainContainer}>
              <TouchableOpacity style={[styles.containers, {backgroundColor: colors.cardColor}]}>
                <MaterialIcons name="notes" size={54} color={colors.buttonColor} />
                <Text style={[styles.smallText, { color: colors.textColor }]}>Notes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={navigateToMap} style={[styles.containers, {backgroundColor: colors.cardColor}]}>
                <FontAwesome6
                  name="map-location-dot"
                  size={54}
                  color={colors.buttonColor}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.containers, {backgroundColor: colors.cardColor}]}>
                <MaterialCommunityIcons
                  name="file-document-edit"
                  size={54}
                  color={colors.buttonColor}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>Documents</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.containers, {backgroundColor: colors.cardColor}]}>
                <MaterialCommunityIcons
                  name="qrcode-scan"
                  size={54}
                  color={colors.buttonColor}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>QR CODE</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  iconText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 22,
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },
  containers: {
    width: "45%",
    height: 120,
    backgroundColor: "#eff0ff",
    borderRadius: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  smallText: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
  texts: {
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 15,
    marginTop: 20,
   
  },
  award: {
    width: "90%",
    flexDirection: "row",
    backgroundColor: "#eff0ff",
    borderRadius: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "center",
    marginBottom: 30,
    marginLeft: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  smallTexts: {
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 10,
    marginTop: 10,
   
  },
  achievements: {
    left: 10,
     color: 'grey',
     marginBottom: 5
  }
});
