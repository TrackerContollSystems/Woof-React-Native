import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type UserInfoDataType = {
  title: string;
  color: string;
  name: any;
  Icon: any;
};

export default function UserInfo() {
  const UserInfoData: UserInfoDataType[] = [
    {
      title: "small",
      color: "#2C3F51",
      name: "exclamationcircle",
      Icon: AntDesign,
    },
    {
      title: "small",
      color: "#2C3F51",
      name: "calendar",
      Icon: AntDesign,
    },
    {
      title: "small",
      color: "#2C3F51",
      name: "list-status",
      Icon: MaterialCommunityIcons,
    },
    {
      title: "small",
      color: "#2C3F51",
      name: "qrcode-scan",
      Icon: MaterialCommunityIcons,
    },
  ];

  return (
    <View style={styles.mainContainer}>
      {UserInfoData.map((val: UserInfoDataType) => {
        const { title, color, name, Icon } = val;
        return (
          <TouchableOpacity style={styles.container}>
            <Icon name={name} size={54} color={color} />
            <Text style={styles.smallText}>{title}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    marginTop: 12,
    flexWrap: "wrap",
    justifyContent: "space-around",
    gap: 5,
  },

  container: {
    width: "45%",
    backgroundColor: "#eff0ff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  smallText: {
    fontSize: 16,
    color: "black",
    marginTop: 3,
  },
});
