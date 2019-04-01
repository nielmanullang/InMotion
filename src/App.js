import React from "react";
import { Root } from "native-base";
import { createStackNavigator } from "react-navigation";

import Home from "./screens/home/";
import Splash from "./screens/splashscreen";
import Login from "./screens/login/";

const AppNavigator = createStackNavigator(
  {
    Splash: {screen: Splash},
    Home: { screen: Home },
    Login: {screen: Login}
  },
  {
    initialRouteName: "Splash",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
