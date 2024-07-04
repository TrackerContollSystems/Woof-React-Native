import { Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { UseUiContext } from "../../../Contexts/UiContext";

type AuthButtonProps = {
  fun: () => void;
  title: string;
};

const AuthButton: FC<AuthButtonProps> = (data) => {
  const { colors } = UseUiContext();
  const { title, fun } = data;
  return (
    <TouchableOpacity
      style={[style.btn, { backgroundColor: colors.buttonColor }]}
      onPress={() => fun()}
    >
      <Text
        style={[
          style.btnText,
          {
            color: colors.btnTextColor,
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    width: "97%",
    borderRadius: 10,
  },

  btnText: {
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
  },
});

export default AuthButton;
