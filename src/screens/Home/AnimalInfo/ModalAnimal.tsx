import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  title: string;
  value: string;
  setValue: (value: string) => void;
};

const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  onSave,
  title,
  value,
  setValue,
}) => {
  const handleChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue(formattedDate);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          onClose();
          Keyboard.dismiss();
        }}
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{title}</Text>
              {title === "Date Of Birth" ? (
                <DateTimePicker
                  value={value ? new Date(value) : new Date()}
                  mode="date"
                  display="default"
                  onChange={handleChange}
                  maximumDate={new Date()}
                />
              ) : title === "Species" ? (
                <RNPickerSelect
                  onValueChange={(value) => setValue(value)}
                  items={[
                    { label: "Dog", value: "Dog" },
                    { label: "Cat", value: "Cat" },
                  ]}
                  value={value}
                  placeholder={{
                    label: "Click select species...",
                    value: null,
                  }}
                />
              ) : title === "Gender" ? (
                <RNPickerSelect
                  onValueChange={(value) => setValue(value)}
                  items={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                  ]}
                  value={value}
                  placeholder={{ label: "Click select gender...", value: null }}
                />
              ) : (
                <TextInput
                  style={styles.modalInput}
                  value={value}
                  onChangeText={(text) => setValue(text)}
                />
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.modalButton} onPress={onClose}>
                  <Text style={styles.modalButtonTexts}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalButton} onPress={onSave}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 20,
  },
  modalButton: {
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "green",
  },
  modalButtonTexts: {
    fontSize: 16,
    color: "red",
  },
});

export default CustomModal;
