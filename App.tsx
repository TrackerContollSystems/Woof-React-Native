import React from "react";
import { withExpoSnack } from "nativewind";

import { NavigationContainer } from "@react-navigation/native";
import RootNavigation from "./navigation/RootNavigator";
import TabNavigator from "./navigation/TabNavigator";
import { Provider } from "react-redux";
import store from "./Store/Store";
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}

export default withExpoSnack(App);

// export default App;
