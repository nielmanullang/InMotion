import { Root } from "native-base";
import React from "react";
import { createStackNavigator } from "react-navigation";
import Home from "./screens/home/";


const AppNavigator = createStackNavigator(
  {
    Home: { screen: Home },
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
