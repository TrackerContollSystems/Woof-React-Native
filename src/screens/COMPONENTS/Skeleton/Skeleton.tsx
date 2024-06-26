// components/SkeletonLoader.tsx
import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonLoader = () => {
  const shimmerAnimated = new Animated.Value(-600);

  Animated.loop(
    Animated.timing(shimmerAnimated, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    })
  ).start();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.shimmer,
          {
            transform: [
              {
                translateX: shimmerAnimated.interpolate({
                  inputRange: [-600, 1],
                  outputRange: [-600, 800],
                }),
              },
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shimmer: {
    backgroundColor: "#f0f0f0",
    height: 200,
    width: 200,
  },
});

export default SkeletonLoader;
