import React from "react";
import { Text, View, TextInput, Button, StyleSheet,TouchableOpacity,ImageBackground } from "react-native";
import DatePicker from "react-native-datepicker";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import { WebBrowser } from "expo";
import { Ionicons } from "@expo/vector-icons";

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
      date: new Date()
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

  validation = () => {
    if (this.firstName == "") {
      this.setState({ message: "אנא הכנס שם פרטי" });
    } else if (this.lastName == "") {
      this.setState({ message: "אנא הכנס שם משפחה" });
    } else if (this.email == "") {
      this.setState({ message: "אנא הכנס כתובת אימייל" });
    } else if (this.password == "") {
      this.setState({ message: "אנא הכנס סיסמא" });
    } else if (
      this.verifyPassword == "" ||
      this.verifyPassword != this.password
    ) {
      this.setState({ message: "אנא אמת את סיסמתך" });
    } else {
      this.vaildForm = true;
      this.register();
    }
  };

  register = () => {
    if (this.vaildForm) {
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
              this.props.navigation.navigate("Camera");
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

  LoginBtn=()=>{
      this.props.navigation.navigate('Login');
  }
  render() {
    return (
      <ImageBackground source={require('../assets/backGroung.jpg')}style={styles.container}>

      <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>הרשמה</Text>

        <TextInput
          style={styles.input}
          placeholder="שם פרטי"
          onChangeText={this.changeFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="שם משפחה"
          onChangeText={this.changeLastName}
        />

        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="אמייל"
          onChangeText={this.changeEmail}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="סיסמא"
          onChangeText={this.changePassword}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="אימות סיסמא"
          onChangeText={this.changeVerifyPassword}
        />

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
           onPress={this.validation}>
           <Text>הרשם</Text>
        </TouchableOpacity>

        <Text style={styles.textMessage}>{this.state.message}</Text>
        <TouchableOpacity
        onPress={this.LoginBtn}
        style={styles.butt}>
<Text>Login</Text>
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
    backgroundColor: 'rgba(255,255,255,.3)',
    alignItems: "center",
        padding: 20,
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
    color:'black',
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
      backgroundColor: 'gray',
      paddingVertical: 10,
      width: 240,
      height: 45,
      borderRadius: 200,
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center',                 
       marginTop: 30

    },  
    formContainer: {
              paddingBottom: 150,
            },
            buttonContainerFB: {
                  backgroundColor: 'gray',
                  paddingVertical: 10,
                  width: 240,
                  height: 45,
                  borderRadius: 200,
                  alignItems: 'center',
                  flexGrow: 1,
                  justifyContent: 'center',
                  marginTop: 30
                },
});
// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#3498db',
//       padding: 20,
//     },
//     formContainer: {
//       paddingBottom: 150,
//     },
//     input: {
//       height: 40,
//       backgroundColor: 'rgba(255,255,255,0.7)',
//       //marginTop: 30,
//       marginBottom: 20,
//       color: '#FFF',
//       paddingHorizontal: 10,
//     },
//     logoContainer: {
//       alignItems: 'center',
//       flexGrow: 1,
//       justifyContent: 'center',
//     },
//     logo: {
//       width: 200,
//       height: 200
//     },
//     buttonContainer: {
//       backgroundColor: '#2980b9',
//       paddingVertical: 10,
//       width: 240,
//       height: 45,
//       borderRadius: 200,
//       alignItems: 'center',
//       flexGrow: 1,
//       justifyContent: 'center',
//       marginLeft: 60,
//     },
//     buttonContainerFB: {
//       backgroundColor: '#2980b9',
//       paddingVertical: 10,
//       width: 240,
//       height: 45,
//       borderRadius: 200,
//       alignItems: 'center',
//       flexGrow: 1,
//       justifyContent: 'center',
//       marginLeft: 60,
//       marginTop: 30
//     },
//     buttonText: {
//       textAlign: 'center',
//       color: '#FFFFFF',
//     },
//   });