import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Modal,
  ScrollView,
} from "react-native";
// @ts-ignore
import ArrowUp from "../../../assets/Icons/arrowUp.png";
// @ts-ignore
import ArrowDown from "../../../assets/Icons/arrowDown.png";

type DropInputProp = {
  Data: any[];
  name: string;
  id: string;
  setDispatch: (id: any) => void;
};

const DropDownInput: FC<DropInputProp> = ({ Data, name, id, setDispatch }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectName, setSelectName] = useState<string>("");

  const filteredData = Data.filter((val) =>
    val[name].toLowerCase().includes(search.toLowerCase())
  );

  const handleDispatchSet = (id: any, name: string) => {
    setDispatch(id);
    setShowDropDown(false);
    setSelectName(name);
    setSearch("");
  };

  return (
    <View style={styles.mainDiv}>
      <Pressable
        style={styles.pressableComp}
        onPress={() => setShowDropDown(!showDropDown)}
      >
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            {selectName || "Select an option"}
          </Text>
        </View>
        <Image
          style={styles.arrowIcon}
          source={showDropDown ? ArrowUp : ArrowDown}
        />
      </Pressable>

      <Modal
        transparent={true}
        animationType="fade"
        visible={showDropDown}
        onRequestClose={() => setShowDropDown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowDropDown(false)}
        >
          <View style={styles.dropContainer}>
            <ScrollView>
              {filteredData.map((val) => (
                <Pressable
                  key={val[id]}
                  style={styles.singleItem}
                  onPress={() => handleDispatchSet(val[id], val[name])}
                >
                  <Text style={styles.itemText}>{val[name]}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainDiv: {
    display: "flex",
    position: "relative",
    width: "100%",
  },
  pressableComp: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedContainer: {
    flex: 1,
    paddingRight: 20,
  },
  selectedText: {
    fontSize: 16,
    color: "#000",
  },
  dropContainer: {
    position: "absolute",
    top: 200,
    left: 30,
    right: 30,
    bottom: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    maxHeight: 300,
    borderRadius: 5,
    elevation: 5,
    paddingTop: 10,
  },
  singleItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 18,
    color: "gray",
    left: 30,
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});

export default DropDownInput;
