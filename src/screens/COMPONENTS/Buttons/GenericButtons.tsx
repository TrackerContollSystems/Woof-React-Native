import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { UseUiContext } from "../../../Contexts/UiContext";

type GenericButtonTypes = {
  title: string;
  fun: () => void;
  buttonStyles?:any | null
  textStyle?: any | null
};

const GenericButton: FC<GenericButtonTypes> = (data) => {
  const { colors } = UseUiContext();
  const { title, fun , } = data;
  return (
    <TouchableOpacity
      style={[data.buttonStyles ? data.buttonStyles : styles.button, { backgroundColor: colors.buttonColor }]}
      onPress={() => {}}
    >
      <Text style={[data.textStyle ? data.textStyle : styles.buttonText, { color: colors.btnTextColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    borderRadius: 2,
  },
  buttonText: {
    fontSize: 18,
  },
});

export default GenericButton;
