import React from "react";
import { Root } from "native-base";
import { createStackNavigator } from "react-navigation";

import Home from "./screens/home/";
import Splash from "./screens/splashscreen";
import Login from "./screens/login/";
import Profile from "./screens/profile/";
import GalleryPopUp from "./screens/profile/galleryPopUp";

const AppNavigator = createStackNavigator(
  {
    Splash: {screen: Splash},
    Home: { screen: Home },
    Login: {screen: Login},
    Profile: {screen: Profile},
    GalleryPopUp: {screen: GalleryPopUp}
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
