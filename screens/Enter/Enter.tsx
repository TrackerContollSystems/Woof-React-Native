import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Video, ResizeMode } from "expo-av";
import { UseAuthContext } from "../../Contexts/AuthContext";
import { useSelector } from "react-redux";

export default function Enter() {
  const { isUserLoggedIn } = UseAuthContext();

  const video: any = React.useRef(null);
  const navigation: any = useNavigation();

  const [i, setI] = useState(false);
  useEffect(() => {
    setI([false, true][Math.floor(Math.random() * 2)]);
    video.current.playAsync();
  }, []);
  const enterHandler = () => {
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      navigation.navigate(`Home`);
    } else {
      navigation.navigate(`Intro`);
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          position: "absolute",

          width: "100%",
          height: "100%",
        }}
      >
        {/* სხვანარიად არ იღებს რექურიედ ვალუს ე */}
        {i ? (
          <Video
            ref={video}
            style={styles.video}
            source={require("../../assets/Videos/Intro2.mp4")}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        ) : (
          <Video
            ref={video}
            style={styles.video}
            source={require("../../assets/Videos/Intro1.mp4")}
            useNativeControls={false}
            resizeMode={ResizeMode.CONTAIN}
            isLooping
          />
        )}
      </View>
      <Text onPress={enterHandler} style={styles.btn}>
        Let's Go
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffe438",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  video: {
    width: "100%",
    height: "100%",
  },
  btn: {
    position: "absolute",
    bottom: 25,
    backgroundColor: "#2C3F51",
    color: "#EBEEEF",
    paddingVertical: 14,
    width: "40%",
    textAlign: "center",
    borderRadius: 10,
    fontSize: 19,
    fontWeight: "bold",
  },
});
