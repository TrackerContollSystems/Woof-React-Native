import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
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

  if (coordinate.isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: (currentLocation.latitude + animalLocation.latitude) / 2,
          longitude: (currentLocation.longitude + animalLocation.longitude) / 2,
          latitudeDelta:
            Math.abs(currentLocation.latitude - animalLocation.latitude) * 2,
          longitudeDelta:
            Math.abs(currentLocation.longitude - animalLocation.longitude) * 2,
        }}
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
