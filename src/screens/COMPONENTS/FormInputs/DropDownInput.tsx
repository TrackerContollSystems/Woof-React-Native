import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from "react-native";
import React, { FC, useState } from "react";
// @ts-ignore
import ArrowUp from "../../../assets/Icons/arrowUp.png";
// @ts-ignore
import ArrowDown from "../../../assets/Icons/arrowDown.png";
type DropInputProp = {
  Data: any[];
  name: string;
  id: string;
  setDispatch: any;
};

const DropDownInput: FC<DropInputProp> = ({ Data, name, id, setDispatch }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selectName, setSelectName] = useState("");
  const filteredData = Data.filter((val: any) =>
    val[name].toLowerCase().includes(search.toLowerCase())
  );
  const handleDispatchSet = (id: any, name: string) => {
    setDispatch(id);
    setShowDropDown(false);
    setSelectName(name);
  };
  return (
    <View style={styles.mainDiv}>
      <Pressable
        style={styles.pressableComp}
        onPress={() => setShowDropDown(!showDropDown)}
      >
        <TextInput
          placeholder={selectName && selectName}
          onChangeText={(e) => setSearch(e)}
        />
        <View>
          {showDropDown ? (
            <Image style={styles.arrowIcon} source={ArrowUp} />
          ) : (
            <Image style={styles.arrowIcon} source={ArrowDown} />
          )}
        </View>
      </Pressable>

      {showDropDown && (
        <ScrollView style={styles.DropContainer}>
          {filteredData.map((val: any) => (
            <View style={styles.singleItem} key={val[id]}>
              <Text
                onPress={() => handleDispatchSet(val[id], val[name])}
                style={{ fontSize: 20, color: "gray" }}
              >
                {val[name]}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  mainDiv: {
    display: "flex",
    position: "relative",
  },
  pressableComp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 1,
  },
  DropContainer: {
    backgroundColor: "white",
    zIndex: 2,
    top: 0,
    left: 0,
    display: "flex",
    positioan: "absolute",
    width: "100%",
    maxHeight: 200,
    borderRadius: 20,
    gap: 40,
    paddingVertical: 20,
  },
  singleItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  arrowIcon: {
    width: 15,
    height: 15,
  },
});
export default DropDownInput;
