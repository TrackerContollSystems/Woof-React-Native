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

type AnimalEditModalProps = {
  visible: boolean;
  onClose: () => void;
  onSave: (caseTitle:string ) => void;
  title: string;
  value: string | null | number;
  // setValue: (val: string, type:string ) => void;
  setValue: (val: string | null | number, type: string) => void; 
};

const AnimalEditModal: React.FC<AnimalEditModalProps> = ({
  visible,
  onClose,
  onSave,
  title,
  value,
  setValue,
}) => {
  // const handleChange = (event: any, selectedDate?: Date ) => {
  //   if (selectedDate) {
  //     setValue(selectedDate.toISOString().split("T")[0], value as string);
  //   }
  //     setValue(event.text, value as string);
  
  // };
  const handleChange = (event: any, selectedDate?: Date) => {
    if (title === "Date Of Birth" && selectedDate) {
      setValue(selectedDate.toISOString().split("T")[0], title);
    } else {
      setValue(event?.text ?? '', title);
    }
  };
  

 

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSave = () => {
    onSave(selectedDate.toISOString().split("T")[0]); 
    onClose();
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
                testID="dateTimePicker"
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleChange}
              />
             
              ) : title === "Species" ? (
                <RNPickerSelect
                onValueChange={(val) => setValue(val, 'specie')} 
                items={[
                  { label: "Dog", value: "Dog" },
                  { label: "Cat", value: "Cat" },
                ]}
                value={value as string}
                placeholder={{
                  label: "Click to select species...",
                  value: null,
                }}
              />
              
              ) : title === "Gender" ? (
                <RNPickerSelect
                  onValueChange={(val ) => setValue(val, value as string  )}
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
                  // value={value as string}
                  onChangeText={(text) => setValue(text, value as string)}
                />
              )}
                <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalCancelButton]}
                  onPress={onClose}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalSaveButton]}
                  onPress={() => onSave(title)}
                >
                  <Text style={styles.modalButtonText}>Save</Text>
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
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    
  },
  modalButtonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  modalButtonTexts: {
    fontSize: 16,
    color: "red",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 20,
  },
  modalCancelButton: {
    backgroundColor: "red",
    right: 2
  },
  modalSaveButton: {
    backgroundColor: "green",
  },
});

export default AnimalEditModal ;
