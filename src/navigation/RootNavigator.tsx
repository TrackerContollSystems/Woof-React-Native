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
import UserSettings from "../screens/Settings/UserSettings";
import { SafeAreaView } from "react-native";
import { UseUiContext } from "../Contexts/UiContext";
import Match from "../screens/Match/Match";

export default function RootNavigation({ children }: any) {
  const Stack = createNativeStackNavigator();
  const { authState } = UseAuthContext();
  const { colors } = UseUiContext();
  return (
    <>
      <StatusBar
        style={colors.StatusBar as "dark" | "light"}
        backgroundColor={colors.backgroundColor}
        translucent={false}
      />
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
              options={{
                headerShown: false,
              }}
              name="Home"
              component={Home}
            />
            <Stack.Screen name="Map" component={Map}   options={{
              
              headerStyle: {
                backgroundColor: colors.backgroundColor,
        
              }, headerTitleStyle: {
                color: colors.textColor, // This sets the color of the header title text
              },
            }}/>
            <Stack.Screen name="Subscription" component={Subscription}  options={{
              
              headerStyle: {
                backgroundColor: colors.backgroundColor,
        
              }, headerTitleStyle: {
                color: colors.textColor, // This sets the color of the header title text
              },
            }} />
            <Stack.Screen
              name="AnimalInfo"
              component={AnimalInfo}
              options={{
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                },
                headerTitleStyle: {
                  color: colors.textColor, // This sets the color of the header title text
                },
              }}
            />
             <Stack.Screen
              name="Match"
              component={Match}
              options={{
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                },
                headerTitleStyle: {
                  color: colors.textColor, // This sets the color of the header title text
                },
              }}
            />
            <Stack.Screen
              options={{
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                },
                headerTitleStyle: {
                  color: colors.textColor, // This sets the color of the header title text
                },
              }}
              name="UserSettings"
              component={UserSettings}
            />
            <Stack.Screen
              name="AnimalInfoDocuments"
              component={AnimalInfoDocuments}
              options={{
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                },
                headerTitleStyle: {
                  color: colors.textColor, // This sets the color of the header title text
                },
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
}
