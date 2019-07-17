import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginPage from "./Components/LoginPage.js";
import RegisterPage from "./Components/RegisterPage.js";
import HomePage from "./Components/HomePage.js";
import SearchPage from "./Components/SearchPage.js";
import PublishPage from "./Components/PublishPage";
import FaceBookPage from "./Components/FaceBookPage";
import AboutUsPage from "./Components/AboutUsPage"; 
import GooglePage from './Components/GooglePage';


class App extends React.Component {
  render() {
    return <StackNav />;
  }
}

const StackNav = createStackNavigator(
  {
    LoginPage: LoginPage,

    HomePage: HomePage,

    SearchPage: SearchPage,

    AboutUsPage: AboutUsPage,

    RegisterPage: RegisterPage,


    PublishPage: PublishPage,

    FaceBookPage: FaceBookPage,

    GooglePage: GooglePage,
  },
  { headerMode: "none", defaultNavigationOptions: { headerVisable: false } },
  {
    initialRouteName: "LoginPage"
  }
);

export default createAppContainer(StackNav);
