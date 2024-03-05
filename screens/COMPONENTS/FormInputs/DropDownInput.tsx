import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { FC, useState } from "react";

type DropInputProp = {
  Data: any[];
  name: string;
  id: string;
};

const DropDownInput: FC<DropInputProp> = ({ Data, name, id }) => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const filteredData = Data.filter((val: any) =>
    val[name].toLowerCase().includes(search.toLowerCase())
  );
  return (
    <View>
      <Pressable onPress={() => setShowDropDown(!showDropDown)}>
        <TextInput onChangeText={(e) => setSearch(e)} placeholder="City" />
        <View>
          <Text>ARROW</Text>
        </View>
      </Pressable>

      {showDropDown && (
        <ScrollView style={styles.DropContainer}>
          {filteredData.map((val: any) => (
            <View style={styles.singleItem} key={val[id]}>
              <Text style={{ fontSize: 20 }}>{val[name]}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  DropContainer: {
    backgroundColor: "white",
    zIndex: 2,
    top: 40,
    left: 8,
    display: "flex",
    positioan: "absolute",
    width: "95%",
    maxHeighta: 200,
    borderRadius: 20,
    gap: 40,
    paddingVertical: 20,
  },
  singleItem: {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});
export default DropDownInput;
