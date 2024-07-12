import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { UseUiContext } from "../../../Contexts/UiContext";
// import styles from "../../Home/AnimalInfo/AnimalInfoStyle";

type GenericInputType = {
    title: string;
    value: string;
    onPress: () => void;
  };
  
  const GenericInput: React.FC<GenericInputType> = ({ title, value, onPress }) => {

    const { colors } = UseUiContext();

    return (
      <TouchableOpacity style={styles.buttonsInformation} onPress={onPress}>
        {value ? <Text style={[styles.buttonValue,  { color: colors.textColor }]}>{value}</Text> : <Text style={styles.buttonTexts}>{title}</Text>}
      </TouchableOpacity>
    );
  };

  const styles = StyleSheet.create({
    buttonsInformation: {
        // backgroundColor: "rgb(232, 255, 233)",
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#E4E4E4",
      },
      buttonValue: {
        fontSize: 18,
        color: "black",
      },
      buttonTexts: {
        fontSize: 18,
        color: "grey",
      },
  })
 

export default GenericInput;
