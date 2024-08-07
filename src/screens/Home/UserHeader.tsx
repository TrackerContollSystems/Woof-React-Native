import React from "react";
import {
  View,
  Text,
 
  Platform,
  StyleSheet,
  Image,
} from "react-native";
 
import { UseAuthContext } from "../../Contexts/AuthContext";
import { UseUiContext } from "../../Contexts/UiContext";
 import GenericButton from "../COMPONENTS/Buttons/GenericButtons";

export default function UserHeader() {
  const { authState, authDispatch } = UseAuthContext();
  const { colors } = UseUiContext();
  const { authUser } = authState;
  return (
    <View style={styles.mainView}>
      <View style={styles.topSection}>
        <View style={styles.emailWrapper}>
          <Text style={[styles.emailText, { color: colors.textColor }]}>
            {authUser.email}
          </Text>
          <Text style={{ fontSize: 14, color: colors.textColor, padding: 4 }}>
            User
          </Text>
        </View>

        <View style={styles.awardWrapper}>
          <Image
            source={require("../../assets/TabNavigateIcons/award.png")}
            style={{ width: 35, height: 35 }}
          />
          <Text style={styles.awardText}>Award</Text>
        </View>
      </View>

      <View style={[styles.container, { backgroundColor: colors.cardColor }]}>
        {/* <View style={styles.container}> */}
        <Text style={[styles.bigText, { color: colors.textColor }]}>
          Big Text Animal ID
        </Text>
        <Text style={[styles.smallText, { color: colors.textColor }]}>
          small textsmall textsmall textsmall textsmall textsmall textsmall text
        </Text>
        <GenericButton title="Button" fun={() => console.log("")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: { marginBottom: 20 },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 7,
    justifyContent: "space-between",
  },
  emailWrapper: { marginLeft: 10 },
  emailText: { fontSize: 18, fontWeight: "bold", padding: 4 },
  awardWrapper: { marginLeft: 95, padding: 5 },
  awardText: { fontSize: 12, color: "gray", textAlign: "center" },
  container: {
    // backgroundColor: "#eff0ff",
    // backgroundColor: "#fcd06b",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  bigText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#2C3F51",
  },
  smallText: {
    fontSize: 16,
    color: "#2C3F51",
  },
});
