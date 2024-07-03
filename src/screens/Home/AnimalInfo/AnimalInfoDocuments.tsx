import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable, Platform  } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface RouteParams {
    photoUri: string;
    animalName: string
  }

export default function AnimalInfoDocuments() {

    const navigation: any = useNavigation();
    const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const { photoUri, animalName } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({ title: animalName });
  }, [navigation, animalName]);
    
  return (
    <View style={styles.container}>
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.iconContainer}>
        {/* <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{animalName}</Text> */}
          <MaterialCommunityIcons name="qrcode-scan" size={34} color="black" />
          <Text style={styles.iconText}>Activate QR Code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}  onPress={() => navigation.navigate("AnimalInfo")}>

        <Image style={{width: 100, height: 100, borderRadius: 45}} source={{ uri: photoUri }} />
          {/* <MaterialCommunityIcons  onPress={() => navigation.navigate("AnimalInfo")} name="dog" size={94} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <MaterialCommunityIcons name="search-web" size={34} color="black" />
          <Text style={styles.iconText}>Announce a search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.containers}>
        <AntDesign name="exclamationcircle" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>Notes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <AntDesign name="calendar" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>Map</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <MaterialCommunityIcons name="list-status" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>Documents</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.containers}>
        <MaterialCommunityIcons name="qrcode-scan" size={54} color="#2C3F51" />
        <Text style={styles.smallText}>The Animal Is Lost</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: "#f0f0f0", 
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontSize: 12,

    textAlign: "center",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },

  containers: {
    width: "45%",
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
});
