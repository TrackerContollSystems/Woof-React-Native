import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';


interface RouteParams {
  photoUri: string;
  animalName: string;
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
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.navigate("AnimalInfo")}
        >
          <Image
            style={{ width: 100, height: 100, borderRadius: 45, marginTop: 10 }}
            source={{ uri: photoUri }}
          />
          {/* <MaterialCommunityIcons  onPress={() => navigation.navigate("AnimalInfo")} name="dog" size={94} color="black" /> */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>

          <AntDesign name="notification" size={34} color="black" />
          <Text style={styles.iconText}>The Animal Is Lost</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.texts}>Award</Text>

        <TouchableOpacity style={styles.award}>
        <MaterialCommunityIcons name="trophy-award" size={64} color="grey" />
        <FontAwesome5 name="award" size={54} color="orange" />

        </TouchableOpacity>


      </View>
      <Text style={styles.smallTexts}>Care</Text>
      <View style={styles.mainContainer}>
       
        <TouchableOpacity style={styles.containers}>
        <MaterialIcons name="notes" size={54} color="#2C3F51" />
      
          <Text style={styles.smallText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
        <FontAwesome6 name="map-location-dot" size={54} color="#2C3F51" />
        
          <Text style={styles.smallText}>Map</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
        <MaterialCommunityIcons name="file-document-edit"  size={54}
            color="#2C3F51" />
     
          <Text style={styles.smallText}>Documents</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.containers}>
          <MaterialCommunityIcons
            name="qrcode-scan"
            size={54}
            color="#2C3F51"
          />
          <Text style={styles.smallText}>QR CODE</Text>
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
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
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
  texts:{
    fontSize: 25,
    marginLeft: 10,
    marginBottom: 30,
    marginTop: 30
    
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
    marginLeft:20 ,
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
    marginBottom: 20,
    marginTop: 10
  }
});
