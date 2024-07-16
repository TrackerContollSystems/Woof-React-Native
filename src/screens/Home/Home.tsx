import { Text,  ScrollView, SafeAreaView } from "react-native";
import React, { useEffect  } from "react";
 import { UseAuthContext } from "../../Contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";

import UserHeader from "./UserHeader";
import UserMain from "./UserMain";
import UserInfo from "./UserInfo";
import { UseUiContext } from "../../Contexts/UiContext";

const Home = () => {
  const { authState } = UseAuthContext();
  const { authUser } = authState;
  const navigation: any = useNavigation();
  const { colors } = UseUiContext();

  // const logout = async () => {
  //   await AsyncStorage.setItem("token", "");
  //   authDispatch({ type: "set_decoded_user", payload: {} });
  //   navigation.navigate(`Login`);
  // };

  useEffect(() => {
    if (!authUser.email) {
      navigation.navigate(`Login`);
    }
  }, []);

  if (authUser && authUser.email) {
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.backgroundColor }}>
      <ScrollView >
        {/* <Button title="logout" onPress={() => logout()} /> */}
      
        <UserHeader />
        <UserMain />
        <UserInfo />
      </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <ScrollView>
        <Text onPress={() => console.log(authUser)}>Logged out </Text>
      </ScrollView>
    );
  }
};

export default Home;
