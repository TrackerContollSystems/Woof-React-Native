import React from "react";
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
// @ts-ignore
import thinkingDog from "../../../assets/Icons/thinkingdog.png";
// @ts-ignore
import crossBones from "../../../assets/Icons/crossBones.png";
// @ts-ignore
import spaceDog from "../../../assets/Icons/spacedog.png";
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
          <Image style={styles.errorIcon} source={thinkingDog} />

          <Pressable style={styles.closebtn} onPress={onClose}>
            <Image style={styles.boneIcon} source={crossBones} />
            <Text style={styles.closeBtnText}>Close</Text>
            <Image style={styles.boneIcon} source={crossBones} />
          </Pressable>
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
          <Image style={styles.succsessIcon} source={spaceDog} />

          <Pressable style={styles.closebtn} onPress={onClose}>
            <Image style={styles.boneIcon} source={crossBones} />
            <Text style={styles.closeBtnText}>Ok</Text>
            <Image style={styles.boneIcon} source={crossBones} />
          </Pressable>
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
  errorIcon: {
    position: "absolute",
    width: 70,
    height: 70,
    right: 280,
    top: 80,
  },
  succsessIcon: {
    position: "absolute",
    width: 70,
    height: 70,
    left: 280,
    top: 80,
  },
  boneIcon: {
    width: 20,
    height: 20,
  },
  closebtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",

    backgroundColor: "#36454F",
    height: 40,
    width: 120,
    borderRadius: 50,
  },
  closeBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "900",
  },
  modalView: {
    width: "90%",
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
