import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
// @ts-ignore

import loadingIcon from "../../../assets/Icons/dog-treat.png";
export default function LoadingAnimation() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={loadingIcon}
        style={[style.image, { transform: [{ rotate: spin }] }]}
      />
    </View>
  );
}
const style = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
});
