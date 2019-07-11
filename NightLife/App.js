import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import HomeMenuView from "./Components/HomeMenuView.js";
import PartyPage from "./Components/PartyPage.js";
import Publish from "./Components/Publish";
import Camera from "./Components/Camera.js";

class App extends React.Component {
  render() {
    return <StackNav />;
  }
}

const StackNav = createStackNavigator(
  {
    PartyPage: PartyPage,
    Login: Login,
    Camera: Camera,
    Publish: Publish,

    HomeMenuView: HomeMenuView,
    Register: Register
  },
  { headerMode: "none", defaultNavigationOptions: { headerVisable: false } },
  {
    initialRouteName: "PartyPage"
  }
);

export default createAppContainer(StackNav);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
