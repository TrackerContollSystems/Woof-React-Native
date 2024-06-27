import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

export default function AnimalLoadingSkeleton() {
  const [animation] = useState(new Animated.Value(0));
  const [textAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: false,
      })
    ).start();

    Animated.loop(
      Animated.timing(textAnimation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColorInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["lightgray", "rgb(174, 174, 174)", "lightgray"],
  });

  const textOpacityInterpolate = textAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.2, 1, 0.2],
  });

  const containerStyle = {
    ...styles.animalContainer,
    backgroundColor: backgroundColorInterpolate,
  };
  const containerStyles = {
    ...styles.animalContainers,
    backgroundColor: backgroundColorInterpolate,
  };

  const textStyle = {
    ...styles.animalText,
    opacity: textOpacityInterpolate,
  };

  return (
    <View style={styles.container}>
      <Animated.View style={containerStyle}></Animated.View>
      <Animated.View style={containerStyles}></Animated.View>
      {/* <Animated.Text style={textStyle}></Animated.Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginRight: 10,
  },
  animalContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 45,
    padding: 10,
    width: 100,
    height: 100,
  },
  animalContainers: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
    width: 60,
    height: 20,
  },
  animalText: {
    fontSize: 16,
    marginTop: 8,
    backgroundColor: "grey",
    width: 50,
  },
});
