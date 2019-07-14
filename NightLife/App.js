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
    Login: Login,

    Publish: Publish,

    PartyPage: PartyPage,
    Camera: Camera,

    HomeMenuView: HomeMenuView,
    Register: Register
  },
  { headerMode: "none", defaultNavigationOptions: { headerVisable: false } },
  {
    initialRouteName: "Login"
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
