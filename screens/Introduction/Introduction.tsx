import React, { useRef, useState } from "react";
import { IntroData } from "./IntroData";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Swiper from "react-native-swiper";

export default function Intro() {
  const [index, setIndex] = useState<number>(0);
  const NextFun = () => {
    setIndex((state: number) =>
      state < IntroData.length - 1 ? state + 1 : (state = 0)
    );
  };

  const width = Dimensions.get("window").width;
  const scrollRef: any = useRef(null) as any | unknown;
  const handleScroll = (event: any) => {
    const slideWidth = event.nativeEvent.layoutMeasurement.width;
    const xOffset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.floor(xOffset / slideWidth);
    if (newIndex !== index) {
      setIndex(newIndex);
    }
  };
  return (
    <View style={style.mainView}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {IntroData.map((item, idx) => (
          <View style={[style.slide, { width: width }]} key={idx}>
            <View style={style.imgContainer}>
              <Image style={style.img} source={item.img} />
              <Image style={style.bgImg} source={item.bg} />
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
                {item.title}
              </Text>
              <Text
                style={{ fontSize: 15, color: "gray", textAlign: "center" }}
              >
                {item.dec}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text
        style={style.btn}
        onPress={() => {
          if (index < IntroData.length - 1) {
            const newIndex = index + 1;
            scrollRef.current.scrollTo({ x: newIndex * width, animated: true });
          } else {
            console.log("Handle last slide logic here");
          }
        }}
      >
        {index < IntroData.length - 1 ? "Next" : "Finish"}
      </Text>
    </View>
  );
}
const style = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
