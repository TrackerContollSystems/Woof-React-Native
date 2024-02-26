import { StyleSheet, Text, View } from "react-native";
import Intro from "../screens/Introduction/Introduction";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Login from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="Test" component={Test} /> */}
    </Stack.Navigator>
  );
}
