import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./Components/LoginPage.js";
import RegisterPage from "./Components/RegisterPage.js";
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";
import PublishPage from "./Components/PublishPage";
import FaceBookPage from "./Components/FaceBookPage";
import AboutUsPage from "./Components/AboutUsPage"; 

class App extends React.Component {
  render() {
    return <StackNav />;
  }
}

const StackNav = createStackNavigator(
  {
    HomePage: HomePage,

    SearchPage: SearchPage,

    AboutUsPage: AboutUsPage,

    RegisterPage: RegisterPage,

    LoginPage: LoginPage,

    PublishPage: PublishPage,

    FaceBookPage: FaceBookPage
  },
  { headerMode: "none", defaultNavigationOptions: { headerVisable: false } },
  {
    initialRouteName: "HomePage"
  }
);

export default createAppContainer(StackNav);
