import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import DatePicker from "react-native-datepicker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";
// import styles from './pageStyle';


var radio_props = [
  {
    icon: <Ionicons name="ios-man" size={18} color="" />,
    label: "  זכר  ",
    value: "זכר"
  },
  {
    icon: <Ionicons name="ios-woman" size={18} color="" />,
    label: "  נקבה  ",
    value: "נקבה"
  }
];

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.firstName = "";
    this.lastName = "";
    this.email = "";
    this.password = "";
    this.verifyPassword = "";
    this.birthday = "";
    this.gender = "";
    this.vaildForm = false;
    this.state = {
      message: "",
      date: new Date(),
      formIsValid: false,
      errors: {}
    };
  }

  changeFirstName = e => {
    this.firstName = e;
  };

  changeLastName = e => {
    this.lastName = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  changePassword = e => {
    this.password = e;
  };

  changeVerifyPassword = e => {
    this.verifyPassword = e;
  };

  changeBirthday = e => {
    this.birthday = e;
  };

  changeGender = e => {
    this.gender = e;
  };

  validateForm() {
    let errors = {};
    let formIsValid = true;

    if (this.firstName == "") {
      formIsValid = false;
      errors["firstName"] = "* אנא הכנס שם פרטי";
    }

    if (this.lastName == "") {
      formIsValid = false;
      errors["lastName"] = "* אנא הכנס שם משפחה";
    }

    if (!this.email) {
      formIsValid = false;
      errors["email"] = "* אנא הכנס כתובת מייל";
    }

    if (this.email != "") {
      let pattern1 = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
      if (!pattern1.test(this.email)) {
        formIsValid = false;
        errors["email"] = "* כתובת המייל אינה תקינה";
      }
    }
    if (this.password == "") {
      formIsValid = false;
      errors["password"] = "* אנא הכנס סיסמה ";
    }

    if (this.password != "") {
      let re = /^(?=.{4,})[a-zA-Z0-9_.-]*$/;
      let res = re.test(this.password);
      if (!res) {
        formIsValid = false;
        errors["password"] = "* הכנס סיסמה בעלת 4 מספרים ואותיות";
      }
    }

    if (this.verifyPassword == "") {
      formIsValid = false;
      errors["verifyPassword"] = "* אנא אמת סיסמה";
    }

    if (this.verifyPassword != "") {
      if (this.verifyPassword != this.password) {
        formIsValid = false;
        errors["verifyPassword"] = "הסיסמה אינה זהה";
      }
    }

    this.setState({
      errors: errors
    });
    return formIsValid;
  }

  // validation = () => {
  //   if (this.firstName == "") {
  //     this.setState({ message: "אנא הכנס שם פרטי" });
  //   } else if (this.lastName == "") {
  //     this.setState({ message: "אנא הכנס שם משפחה" });
  //   } else if (this.email == "") {

  //     this.setState({ message: "אנא הכנס כתובת אימייל" });
  //   } else if (this.password == "") {
  //     this.setState({ message: "אנא הכנס סיסמא" });
  //   } else if (
  //     this.verifyPassword == "" ||
  //     this.verifyPassword != this.password
  //   ) {
  //     this.setState({ message: "אנא אמת את סיסמתך" });
  //   } else {
  //     this.vaildForm = true;
  //     this.register();
  //   }
  // };

  register = () => {
    if (this.validateForm()) {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        birthday: this.birthday,
        gender: this.gender
      };
      console.log(data);
      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/Register",
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
              this.setState({
                message: "הרשמה נכשלה"
              });
              return;
            } else {
              this.props.navigation.navigate("HomeMenuView");
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

  LoginBtn = () => {
    this.props.navigation.navigate("Login");
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>הרשמה</Text>

            <TextInput
              style={styles.input}
              placeholder="שם פרטי"
              onChangeText={this.changeFirstName}
            />
            {/* <Text style={{ color: 'red' }}>{this.state.errors.firstName}</Text> */}

            <TextInput
              style={styles.input}
              placeholder="שם משפחה"
              onChangeText={this.changeLastName}
            />
            {/* <Text style={{ color: 'red' }}>{this.state.errors.lastName}</Text> */}

            <TextInput
              style={styles.input}
              keyboardType="email-address"
              placeholder="אמייל"
              onChangeText={this.changeEmail}
            />
            {/* <Text style={{ color: 'red' }}>{this.state.errors.email}</Text> */}

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="סיסמא"
              onChangeText={this.changePassword}
            />
            {/* <Text style={{ color: 'red' }}>{this.state.errors.password}</Text> */}

            <TextInput
              style={styles.input}
              secureTextEntry={true}
              placeholder="אימות סיסמא"
              onChangeText={this.changeVerifyPassword}
            />
            {/* <Text style={{ color: 'red' }}>{this.state.errors.verifyPassword}</Text> */}

            <DatePicker
              style={{ width: 200, margin: 10 }}
              date={this.state.date}
              mode="date"
              placeholder="יום הולדת"
              format="DD-MM-YYYY"
              minDate={
                new Date().getDate() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                (new Date().getFullYear() - 120)
              }
              maxDate={new Date()}
              customStyles={{
                dateIcon: {
                  position: "absolute",
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />

            <RadioForm
              radio_props={radio_props}
              initial={0}
              style={styles.genderRadio}
              onPress={value => {
                this.setState({ value: value });
              }}
            />

            {/* <Button
          title="הרשם"
           style={styles.buttonContainer}
           onPress={this.validation}
         /> */}
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.register}
            >
              <Text>הרשם</Text>
            </TouchableOpacity>
            <Text style={styles.textMessage}>
              {this.state.errors.firstName ||
                this.state.errors.lastName ||
                this.state.errors.email ||
                this.state.errors.password ||
                this.state.errors.verifyPassword}
            </Text>
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
    padding: 20
  },
  title: {
    fontSize: 40,
    margin: 30
  },
  input: {
    borderRadius: 10,
    fontSize: 10,
    height: 40,
    width: 200,
    textAlign: "center",
    borderColor: "gray",
    borderWidth: 2,
    margin: 10,
    color: "black"
  },
  textMessage: {
    margin: 50,
    color: "red"
  },
  registerBtn: {
    color: "red"
  },
  genderRadio: {
    flexDirection: "row",
    margin: 10
  },
  textMessage: {
    margin: 10,
    color: "red"
  },
  buttonContainer: {
    backgroundColor: "gray",
    paddingVertical: 10,
    width: 240,
    height: 45,
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 20
  },
  formContainer: {
    paddingBottom: 150
  },
  buttonContainerFB: {
    backgroundColor: "gray",
    paddingVertical: 10,
    width: 240,
    height: 45,
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 30
  }
});

