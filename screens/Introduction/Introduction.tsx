import React, { useState } from "react";
import { IntroData } from "./IntroData";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Intro() {
  const [index, setIndex] = useState<number>(0);
  const NextFun = () => {
    setIndex((state: number) =>
      state < IntroData.length - 1 ? state + 1 : (state = 0)
    );
  };

  return (
    <View style={style.mainView}>
      <View
        style={{
          width: "100%",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          display: "flex",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Skip</Text>
      </View>
      <View style={style.textAndImgWrapper}>
        <View style={style.imgContainer}>
          <Image style={style.img} source={IntroData[index].img} />
          <Image style={style.bgImg} source={IntroData[index].bg} />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            paddingBottom: 20,
          }}
        >
          {new Array(IntroData.length)
            .fill("f")
            .map((val: string, i: number) => (
              <View
                key={i}
                style={{
                  width: i == index ? 20 : 12,
                  height: 12,
                  borderRadius: 220,
                  backgroundColor: i == index ? "#2C3F51" : "#D3D3D3",
                }}
              ></View>
            ))}
        </View>
        <View style={style.textContainer}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {IntroData[index].title}
          </Text>
          <Text style={{ fontSize: 15, color: "gray", textAlign: "center" }}>
            {IntroData[index].dec}
          </Text>
        </View>
      </View>
      {index < 3 ? (
        <Text style={style.btn} onPress={NextFun}>
          Next
        </Text>
      ) : (
        <Text style={style.btn} onPress={NextFun}>
          Finish
        </Text>
      )}
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    height: "100%",
    display: "flex",
    justifyContent: "space-around",
    padding: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  textAndImgWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  imgContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    zIndex: 1,
    right: -70,
    top: -16,
    marginRight: 120,
    position: "absolute",
    height: 360,
    width: 280,
  },
  bgImg: {
    width: 400,
    height: 300,
  },
  btn: {
    backgroundColor: "#2C3F51",
    color: "#EBEEEF",
    paddingVertical: 14,
    width: "97%",
    textAlign: "center",
    borderRadius: 10,
    fontSize: 19,
    fontWeight: "bold",
  },
  textContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "90%",
    height: 70,
  },
});
