import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import * as Location from "expo-location";
import { useQuery } from "@tanstack/react-query";
import { GetCoordinates } from "../../API/Map/GetCoordinatesRequest";
import LoadingAnimation from "../COMPONENTS/animations/LoadingAnimation";
import { Ionicons } from "@expo/vector-icons";

type LocationType = {
  latitude: number;
  longitude: number;
};

const Map: React.FC = () => {
  const coordinate = useQuery({
    queryKey: ["get-animal-coordinates"],
    queryFn: GetCoordinates,
    refetchInterval: 10000,
  });

  const [currentLocation, setCurrentLocation] = useState<LocationType | null>(
    null
  );
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
        latitude: coordinate.data[0].latitude,
        longitude: coordinate.data[0].longitude,
      });
    }
    console.log(coordinate.data);
  }, [coordinate.isSuccess]);

  const mapViewRef = useRef<MapView>(null);

  const [isZoomed, setIsZoomed] = useState(true);

  const georgiaBounds = {
    minLongitude: 40,
    maxLongitude: 47,
  };

  const isWithinGeorgiaBounds = (region: any) => {
    return (
      region.longitude >= georgiaBounds.minLongitude &&
      region.longitude <= georgiaBounds.maxLongitude
    );
  };

  const handleRegionChangeComplete = (region: any) => {
    if (!isWithinGeorgiaBounds(region)) {
      mapViewRef.current?.animateToRegion({
        latitude: 42.694404590427304,
        longitude: 43.392872883392144,
        latitudeDelta: 9.045499067191386,
        longitudeDelta: 7.038608269499669,
      });
    }
  };

  const handleNavigateToCurrentLocation = () => {
    mapViewRef.current?.animateToRegion({
      latitude: currentLocation!.latitude,
      longitude: currentLocation!.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  // Fetch directions and parse the polyline points
  const [polylineCoordinates, setPolylineCoordinates] = useState<LatLng[]>([]);
  const getDirrection = () => {
    if (
      currentLocation &&
      animalLocation.latitude !== 0 &&
      animalLocation.longitude !== 0
    ) {
      let directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${animalLocation.latitude},${animalLocation.longitude}&key=AIzaSyDSRG7LLiZ1r9gsorJikzbwa35MRDHuk00`;

      fetch(directionsUrl)
        .then((response) => response.json())
        .then((responseJson) => {
          const points = responseJson.routes[0].overview_polyline.points;
          const coords = decode(points);
          console.log(coords);
          setPolylineCoordinates(coords);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    // Function to decode Google Maps Polyline encoding        
    const decode = (t: string) => {
      let index = 0;
      const latlngs = [];
      let lat = 0;
      let lng = 0;

      while (index < t.length) {
        let b;
        let shift = 0;
        let result = 0;
        do {
          b = t.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lat += dlat;
        shift = 0;
        result = 0;
        do {
          b = t.charCodeAt(index++) - 63;
          result |= (b & 0x1f) << shift;
          shift += 5;
        } while (b >= 0x20);
        const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
        lng += dlng;

        latlngs.push({ latitude: lat * 1e-5, longitude: lng * 1e-5 });
      }
      return latlngs;
    };
  };
  useEffect(() => {
    getDirrection();
  }, [animalLocation]);
  if (!currentLocation || coordinate.isPending) {
    return <LoadingAnimation />;
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.033,
        }}
        onRegionChangeComplete={handleRegionChangeComplete}
        zoomEnabled={isZoomed}
        // @ts-ignore
        provider={MapView.PROVIDER_GOOGLE}
      >
        {currentLocation && (
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
        )}
        {animalLocation.latitude && animalLocation.longitude && (
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
        )}
        {polylineCoordinates.length > 0 && (
          <Polyline
            coordinates={polylineCoordinates}
            strokeColor="#44BFFC"
            strokeWidth={5}
            lineDashPattern={[5, 2]}
             lineCap="butt"
             lineJoin="bevel"
             geodesic={true}
          />
        )}
      </MapView>
      <TouchableOpacity
        style={styles.button}
        onPress={handleNavigateToCurrentLocation}
      >
        <Ionicons name="navigate-circle-outline" size={55} color="#2C3F51" />
      </TouchableOpacity>
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
  button: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
});

export default Map;
