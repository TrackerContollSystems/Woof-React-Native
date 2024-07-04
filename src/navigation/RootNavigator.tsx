import Intro from "../screens/Introduction/Introduction";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home/Home";
import Login from "../screens/Auth/Login/Login";
import SignUp from "../screens/Auth/SignUp/SignUp";
import MoreSignUpInfio from "../screens/Auth/SignUp/MoreSignUpInfo";

import Enter from "../screens/Enter/Enter";
import React from "react";
import ForgotPassword from "../screens/Auth/ForgotPass/ForgotPassword";
import Subscription from "../screens/Subscription/Subscription";
import { StatusBar } from "expo-status-bar";
import Map from "../screens/Map/Map";
import AnimalInfo from "../screens/Home/AnimalInfo/AnimalInfo";
import AnimalInfoDocuments from "../screens/Home/AnimalInfo/AnimalInfoDocuments";
import { UseAuthContext } from "../Contexts/AuthContext";

export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();
  const { authState } = UseAuthContext();

  return (
    <>
      <StatusBar style="dark" backgroundColor="#ffffff" translucent={false} />
      <Stack.Navigator>
        {!authState.authUser.email ? (
          //  auth pages
          <>
            <Stack.Screen
              name="Enter"
              component={Enter}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#FFE300",
                },
              }}
            />
            <Stack.Screen
              name="Intro"
              component={Intro}
              options={{ headerShown: false }}
            />

            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={SignUp} />
            <Stack.Screen name="User Info" component={MoreSignUpInfio} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Enter"
              component={Enter}
              options={{
                headerShown: false,
                headerStyle: {
                  backgroundColor: "#FFE300",
                },
              }}
            />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

            {/* მომხარებლის უშვალო ინტერფეისები */}
            <Stack.Screen
              // options={{
              //   headerShown: false,
              // }}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Subscription" component={Subscription} />
            <Stack.Screen name="AnimalInfo" component={AnimalInfo} />
            <Stack.Screen
              name="AnimalInfoDocuments"
              component={AnimalInfoDocuments}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
