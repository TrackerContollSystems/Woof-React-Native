

import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import EvilIcons from "@expo/vector-icons/EvilIcons";

type Location = {
  latitude: number;
  longitude: number;
};

const initialLocation1: Location = {
  latitude: 41.7792,
  longitude: 44.7797,
};

const initialLocation2: Location = {
  latitude: 41.7993,
  longitude: 44.7661,
};

const Map: React.FC = () => {
  const [location1, setLocation1] = useState<Location>(initialLocation1);
  const [location2, setLocation2] = useState<Location>(initialLocation2);

  const initialRegion = {
    latitude: (location1.latitude + location2.latitude) / 2,
    longitude: (location1.longitude + location2.longitude) / 2,
    latitudeDelta: Math.abs(location1.latitude - location2.latitude) * 2,
    longitudeDelta: Math.abs(location1.longitude - location2.longitude) * 2,
  };

  const mapViewRef = useRef<MapView>(null);

  const polylineCoordinates = [
    { latitude: location1.latitude, longitude: location1.longitude },
    { latitude: location2.latitude, longitude: location2.longitude },
  ];

  const navigateToLocation = (location: Location, delta: number = 0.02) => {
    if (mapViewRef.current) {
      const region = {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: delta,
        longitudeDelta: delta * (initialRegion.longitudeDelta / initialRegion.latitudeDelta),
      };
      mapViewRef.current.animateToRegion(region, 1000);
    }
  };

  const zoomIn = () => {
    navigateToLocation(location1, initialRegion.latitudeDelta / 2);
  };

  const zoomOut = () => {
    navigateToLocation(location1, initialRegion.latitudeDelta * 2);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{
            latitude: location1.latitude,
            longitude: location1.longitude,
          }}
          title="Location 1"
          description="Description for Location 1"
        >
          <EvilIcons name="location" size={40} color="black" />
        </Marker>
        <Marker
          coordinate={{
            latitude: location2.latitude,
            longitude: location2.longitude,
          }}
          title="Location 2"
          description="Description for Location 2"
        />
        <Polyline
          coordinates={polylineCoordinates}
          strokeColor="grey"
          strokeWidth={3}
        />
      </MapView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.roundButton, { top: "50%" }]}
          onPress={() => navigateToLocation(location1)}
        >
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, { top: "60%" }]}
          onPress={() => navigateToLocation(location2)}
        >
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, { top: "70%" }]}
          onPress={zoomIn}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roundButton, { top: "80%" }]}
          onPress={zoomOut}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
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
  buttonContainer: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    right: 10,
    top: "20%",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Map;

