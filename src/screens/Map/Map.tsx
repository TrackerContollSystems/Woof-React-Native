import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polygon, Polyline } from "react-native-maps";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { GetCoordinates } from "../../API/Map/GetCoordinatesRequest";
import LoadingAnimation from "../COMPONENTS/animations/LoadingAnimation";

type LocationType = {
  latitude: number;
  longitude: number;
};

const Map: React.FC = () => {
  const coordinate = useQuery({
    queryKey: ["get-animal-coordinates"],
    queryFn: GetCoordinates,
    refetchInterval: 1000,
  });

  const [currentLocation, setCurrentLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
  });
  const [animalLocation, setAnimalLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    fetchCurrentLocation();
  }, []);

  useEffect(() => {
    if (coordinate.isSuccess) {
      setAnimalLocation({
        latitude: coordinate.data.latitude,
        longitude: coordinate.data.longitude,
      });
    }
  }, [coordinate.isSuccess]);

  const mapViewRef = useRef<MapView>(null);

  const polylineCoordinates = [
    {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
    },
    { latitude: animalLocation.latitude, longitude: animalLocation.longitude },
  ];
  const [longitude, setLongitude] = useState<null | Number>(null);

  // useEffect(() => {
  //   if (
  //     mapViewRef.current &&
  //     currentLocation.latitude !== 0 &&
  //     animalLocation.latitude !== 0
  //   ) {
  //     const coordinates = [
  //       {
  //         latitude: currentLocation.latitude,
  //         longitude: currentLocation.longitude,
  //       },
  //       {
  //         latitude: animalLocation.latitude,
  //         longitude: animalLocation.longitude,
  //       },
  //     ];

  //     mapViewRef.current.fitToCoordinates(coordinates, {
  //       edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
  //       animated: true,
  //     });
  //   }
  // }, [currentLocation, animalLocation]);

 const [isZoomed,setIsZoomed] = useState(true)
 
 
const georgiaBounds = {
  minLongitude: 40,  // Assuming Georgia's approximate longitude bounds
  maxLongitude: 47,
};

const isWithinGeorgiaBounds = (region:any) => {
  return (
    region.longitude >= georgiaBounds.minLongitude &&
    region.longitude <= georgiaBounds.maxLongitude
  );
};

// Adjust your onRegionChangeComplete callback
const handleRegionChangeComplete = (region:any) => {
  if (!isWithinGeorgiaBounds(region)) {
    // If outside Georgia bounds, adjust the map view to focus on Georgia
    mapViewRef.current?.animateToRegion({
      latitude: 42.694404590427304,  // Georgia's approximate latitude center
      longitude: 43.392872883392144, // Georgia's approximate longitude center
      latitudeDelta: 9.045499067191386, // Adjust delta values as needed for zoom level
      longitudeDelta: 7.038608269499669,
    });
  }
};
   if (coordinate.isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <View style={styles.container}>
      <MapView
      
      ref={mapViewRef}
      style={styles.map}
      region={{
        latitude: currentLocation.latitude,
        longitude: longitude !== null ? longitude : currentLocation.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.033,
      }}
      onRegionChangeComplete={handleRegionChangeComplete}
      zoomEnabled={isZoomed}
    >
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          title="Current Location"
          description="This is your current location"
        >
          <EvilIcons name="location" size={40} color="blue" />
        </Marker>
        <Marker
          coordinate={{
            latitude: animalLocation.latitude,
            longitude: animalLocation.longitude,
          }}
          title="Animal Location"
          description="This is the animal's location"
        >
          <EvilIcons name="location" size={40} color="red" />
        </Marker>
        <Polyline
          coordinates={polylineCoordinates}
          strokeColor="grey"
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    flex: 1,
  },
});

export default Map;


