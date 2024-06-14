import React, { useEffect } from "react";
import { withExpoSnack } from "nativewind";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./src/navigation/RootNavigator";
import TabNavigator from "./src/navigation/TabNavigator";
import { Provider } from "react-redux";
import { LanguageContextProvider } from "./src/Contexts/LanguageContext";
import store from "./src/Store/Store";
import { AuthContextProvider } from "./src/Contexts/AuthContext";
const queryClient = new QueryClient();

function App() {
  return (
    <LanguageContextProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <NavigationContainer>
              <RootNavigation />
              <TabNavigator />
            </NavigationContainer>
          </AuthContextProvider>
        </QueryClientProvider>
      </Provider>
    </LanguageContextProvider>
  );
}

export default withExpoSnack(App);

// export default App;
