import React from "react";
import { withExpoSnack } from "nativewind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { LanguageContextProvider } from "./src/Contexts/LanguageContext";
import store from "./src/Store/Store";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
import RootNavigation from "./src/navigation/RootNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { View, StyleSheet } from "react-native";
import { PhotoContextProvider } from "./src/Contexts/PhotoPickerContext";

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

function App() {
  return (
    <LanguageContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <PhotoContextProvider>
              <NavigationContainer>
                <View style={styles.container}>
                  <View style={styles.content}>
                    <RootNavigation />
                  </View>
                  <View style={styles.footer}>
                    <TabNavigator />
                  </View>
                </View>
              </NavigationContainer>
            </PhotoContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Provider>
    </LanguageContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  footer: {
    height: 80,
  },
});

export default withExpoSnack(App);
