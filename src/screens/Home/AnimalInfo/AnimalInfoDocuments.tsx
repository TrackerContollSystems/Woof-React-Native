import React, { useEffect, useState } from "react";
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
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import QRCodeScanner from "./Components/QRCodeScanner";
import { UseUiContext } from "../../../Contexts/UiContext";
import { useQuery } from "@tanstack/react-query";
import { GetAnimalDetailsById } from "../../../API/User/GetAnimalDetailsByUserRequest";
import LoadingAnimation from "../../COMPONENTS/animations/LoadingAnimation";

interface RouteParams {
  photoUri: string;
  animalName: string;
}

export default function AnimalInfoDocuments() {
  const navigation: any = useNavigation();
  const route = useRoute<any>();
  const { photoUri, animalName } = route.params;

  const [scanned, setScanned] = useState(false);
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const { colors } = UseUiContext();
  const navigateToMap = () => {
    navigation.navigate("Map");
  };

  const AwardIcons = [
    {
      name: "award",
      uri: require("../../../assets/TabNavigateIcons/trophy-star.png"),
    },
    {
      name: "trophy-award",
      uri: require("../../../assets/TabNavigateIcons/awards.png"),
    },
  ];

  const toggleIconSelection = (iconName: string) => {
    const isSelected = selectedIcons.includes(iconName);
    if (isSelected) {
      setSelectedIcons(selectedIcons.filter((name) => name !== iconName));
    } else {
      setSelectedIcons([...selectedIcons, iconName]);
    }
  };

  const SingleAnimalData = useQuery({
    queryKey: ["get-single-animal-data", route.params.id],
    queryFn: () => GetAnimalDetailsById(route.params.id),
  });

  const { data, isPending, isError, isSuccess } = SingleAnimalData;
 

  // React.useEffect(()=>{console.log( data)},[data])
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

  if (isPending) {
    return <LoadingAnimation />;
  }

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
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
                <Image
                  source={require("../../../assets/TabNavigateIcons/qr-code.png")}
                  style={{ width: 34, height: 34 }}
                />
                <Text style={[styles.iconText, { color: colors.textColor }]}>
                  Activate QR Code
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => navigation.navigate("AnimalInfo", { data })}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 45,
                    marginTop: 10,
                  }}
                  source={{ uri: data.icon }}
                />
              </TouchableOpacity>
              <View></View>
              <TouchableOpacity style={styles.iconContainer}>
                <Image
                  source={require("../../../assets/TabNavigateIcons/alert.png")}
                  style={{ width: 34, height: 34 }}
                />
                <Text style={[styles.iconText, { color: colors.textColor }]}>
                  Mark as lost
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.texts, { color: colors.textColor }]}>
                Award
              </Text>
              <Text style={styles.achievements}>Your pet's achievements</Text>

              <View
                style={[styles.award, { backgroundColor: colors.cardColor }]}
              >
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
                    <Image
                      source={icon.uri}
                      style={{
                        width: 64,
                        height: 64,
                        tintColor: selectedIcons.includes(icon.name)
                          ? undefined
                          : "grey",
                      }}
                    />
                  </Pressable>
                ))}
              </View>
            </View>
            <Text style={[styles.smallTexts, { color: colors.textColor }]}>
              Care
            </Text>
            <View style={styles.mainContainer}>
              <TouchableOpacity
                style={[
                  styles.containers,
                  { backgroundColor: colors.cardColor },
                ]}
              >
                <Image
                  source={require("../../../assets/TabNavigateIcons/notes.png")}
                  style={{ width: 64, height: 64 }}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>
                  Notes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToMap}
                style={[
                  styles.containers,
                  { backgroundColor: colors.cardColor },
                ]}
              >
                <Image
                  source={require("../../../assets/TabNavigateIcons/map.png")}
                  style={{ width: 64, height: 64 }}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>
                  Map
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.containers,
                  { backgroundColor: colors.cardColor },
                ]}
              >
                <Image
                  source={require("../../../assets/TabNavigateIcons/documentation.png")}
                  style={{ width: 64, height: 64 }}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>
                  Documents
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.containers,
                  { backgroundColor: colors.cardColor },
                ]}
              >
                <Image
                  source={require("../../../assets/TabNavigateIcons/qr-code.png")}
                  style={{ width: 64, height: 64 }}
                />
                <Text style={[styles.smallText, { color: colors.textColor }]}>
                  QR CODE
                </Text>
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
    color: "grey",
    marginBottom: 5,
  },
});
