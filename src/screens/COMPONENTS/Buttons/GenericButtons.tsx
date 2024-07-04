import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { UseUiContext } from "../../../Contexts/UiContext";

type GenericButtonTypes = {
  title: string;
  fun: () => void;
};

const GenericButton: FC<GenericButtonTypes> = (data) => {
  const { colors } = UseUiContext();
  const { title, fun } = data;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.buttonColor }]}
      onPress={() => {}}
    >
      <Text style={[styles.buttonText, { color: colors.btnTextColor }]}>
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
