import Intro from "../screens/Introduction/Introduction";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Login from "../screens/Auth/Login/Login";
import SignUp from "../screens/Auth/SignUp/SignUp";
import MoreSignUpInfio from "../screens/Auth/SignUp/MoreSignUpInfo";

import Enter from "../screens/Enter/Enter";
import React from "react";
import ForgotPassword from "../screens/Auth/ForgotPass/ForgotPassword";
export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Enter"
        component={Enter}
        options={{
          headerStyle: {
            backgroundColor: "#FFE300",
          },
        }}
      />

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />

      <Stack.Screen name="User Info" component={MoreSignUpInfio} />
      <Stack.Screen
        name="Intro"
        component={Intro}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      {/* <Stack.Screen name="Test" component={Test} /> */}
    </Stack.Navigator>
  );
}
