import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export default function AnimalModalLoadingSkeleton() {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const backgroundColorInterpolate = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["lightgray", "grey", "lightgray"],
  });

  const skeletonStyle = (style: any) => ({
    ...style,
    backgroundColor: backgroundColorInterpolate,
  });

  return (
    <View style={styles.container}>
      <Animated.View style={skeletonStyle(styles.skeleton)} />
      <Animated.View style={skeletonStyle(styles.skeleton2)} />
      <View style={styles.rowWrap}>
        {[...Array(6)].map((_, i) => (
          <Animated.View key={i} style={skeletonStyle(styles.skeleton3)} />
        ))}
      </View>
      <View style={styles.row}>
        {[...Array(2)].map((_, i) => (
          <Animated.View key={i} style={skeletonStyle(styles.skeleton4)} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", width: "100%" },
  rowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: 300,
  },
  row: { flexDirection: "row" },
  skeleton: { width: 180, height: 180, borderRadius: 5, marginVertical: 5 },
  skeleton2: { width: 270, height: 40, borderRadius: 5, marginVertical: 5 },
  skeleton3: {
    width: 80,
    height: 80,
    borderRadius: 45,
    margin: 5,
    padding: 10,
  },
  skeleton4: {
    width: 120,
    height: 35,
    borderRadius: 5,
    margin: 5,
    marginHorizontal: 20,
  },
});
