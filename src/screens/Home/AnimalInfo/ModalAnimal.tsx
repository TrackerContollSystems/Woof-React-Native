import React from "react";
import { View, Text, Modal, TouchableOpacity, TextInput } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./AnimalInfoStyle";

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
      <View style={styles.modalContainer}>
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
              placeholder={{ label: "Click select species...", value: null }}
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
      </View>
    </Modal>
  );
};

export default CustomModal;
