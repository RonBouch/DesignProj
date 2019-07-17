import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import {Input} from 'react-native-elements';
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.email = "";
    this.vaildForm = false;
    (global.id = 0),
      (this.state = {
        message: ""
      });
  }

  changePass = e => {
    this.password = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  validation = () => {
    if (this.email == "") {
      this.setState({ message: "* אנא הכנס כתובת אימייל" });
    } else if (this.password == "") {
      this.setState({ message: "* אנא הכנס סיסמא" });
    } else {
      this.vaildForm = true;
      this.login();
    }
  };

  login = () => {
    if (this.vaildForm) {
      const data = {
        password: this.password,
        email: this.email
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/Login",
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/Json;"
          }),
          body: JSON.stringify(data)
        }
      )
        .then(res => {
          console.log("res=", res);
          return res.json();
        })
        .then(
          result => {
            console.log("fetch POST= ", result);
            let u = JSON.parse(result.d);
            console.log("u = " + u);
            if (u == null) {
              console.log("ASffasasf");
              this.setState({
                message: "התחברות נכשלה"
              });
              return;
            } else {
              global.id = u.ID;
              console.log("user id = " + global.id);
              this.props.navigation.navigate("HomePage");
            }
            console.log(result.d);
            console.log(result);
          },
          error => {
            console.log("err post=", error);
          }
        );
    }
  };

  RegisterBtn = () => {
    this.props.navigation.navigate("RegisterPage");
  };

  // FaceBookBtn = () => {
  //   this.props.navigation.navigate("FaceBookPage");
  // };

  // GoogleBtn = () => {
  //   this.props.navigation.navigate("GooglePage");
  // };

  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View>
              <Image
                source={require("../assets/smalllogo.png")}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.loginForm}>
              <TextInput
                style={styles.input}
                keyboardType="email-address"
                placeholder="אימייל"
                onChangeText={this.changeEmail}
              />

              <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder="סיסמא"
                onChangeText={this.changePass}
              />

              <TouchableOpacity
                style={styles.loginButton}
                onPress={this.validation}
              >
                <Text style={styles.loginButton}>התחבר</Text>
              </TouchableOpacity>

              <Text style={styles.textMessage}>{this.state.message}</Text>
            </View>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={this.RegisterBtn}
            >
              <Text>הרשמה</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('GooglePage')}
              style={styles.googleButton}
            >
              <Text style={styles.buttonText}>
                <Ionicons name="logo-google" size={18} style={styles.icon} />
                {"  "}
                Google
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.FaceBookBtn}
              style={styles.faceBookButton}
            >
              <Text style={styles.buttonText}>
                <Ionicons name="logo-facebook" size={18} style={styles.icon} />
                {"  "}
                FaceBook
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.3)",
    alignItems: "center",
    padding: 40
  },
  title: {
    fontSize: 40,
    margin: 30
  },
  loginForm: {
    marginTop: 20
  },
  loginButton: {
    color: "blue"
  },
  input: {
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 10,
    height: 40,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 2,
    margin: 10
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  cardImage: {
    width: 240,
    height: 130
  },

  genderRadio: {
    flexDirection: "row",
    margin: 10
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  registerButton: {
    backgroundColor: "rgba(255,255,0,.7)",
    borderRadius: 200,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderColor: "white",
    borderWidth: 2
  },
  formContainer: {
    paddingBottom: 150
  },
  faceBookButton: {
    backgroundColor: "rgba(0,0,255,.7)",
    borderRadius: 200,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderColor: "white",
    borderWidth: 2
  },
  googleButton: {
    backgroundColor: "rgba(0,255,0,.7)",
    borderRadius: 200,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    borderColor: "white",
    borderWidth: 2
  },
  buttonText: {
    color: "white"
  }
});
