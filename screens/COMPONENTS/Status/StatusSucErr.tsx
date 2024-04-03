import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

interface PopupProps {
  message: string;
  onClose: () => void;
}

const ErrorPopup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={!!message}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const SuccessPopup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <Modal animationType="slide" transparent={true} visible={!!message}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{message}</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export { ErrorPopup, SuccessPopup };
