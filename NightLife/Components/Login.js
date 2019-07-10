import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Linking,
   TouchableOpacity,
   ImageBackground
} from "react-native";
import { WebBrowser } from "expo";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.password = "";
    this.email = "";
    this.vaildForm = false;
    this.state = {
      message: "",
      data:"avi"
    };
  }

  changePass = e => {
    this.password = e;
  };

  changeEmail = e => {
    this.email = e;
  };

  validation = () => {
    if (this.email == "") {
      this.setState({ message: "אנא הכנס כתובת אימייל" });
    } else if (this.password == "") {
      this.setState({ message: "אנא הכנס סיסמא" });
    } else {
      this.vaildForm = true;
      this.login();
    }
  };

  login = () => {
    this.props.navigation.navigate('HomeMenuView',{s:6});
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
  RegisterBtn=()=>{
    this.props.navigation.navigate('Register')
  }
  render() {
    return (
      <ImageBackground source={require('../assets/backGroung.jpg')}style={styles.container}>

      <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>התחברות</Text>
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
 <Text style={styles.textMessage}>{this.state.message}</Text>
         <TouchableOpacity
        style={styles.buttonContainer}
           onPress={()=>this.props.navigation.navigate('HomeMenuView')}>
           <Text>התחבר</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
        style={styles.buttonContainer}
           onPress={this.RegisterBtn}>
           <Text>הרשמה</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('FaceBookPage')}
            style={styles.buttonContainerFB} >
            <Text style={styles.buttonText}>FaceBook login</Text>
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
//   container: {
//     flex: 1,
//     backgroundColor: '#3498db',
//     padding: 20,
//   },
//   formContainer: {
//     paddingBottom: 150,
//   },
//   input: {
//     height: 40,
//     backgroundColor: 'rgba(255,255,255,0.7)',
//     //marginTop: 30,
//     marginBottom: 20,
//     color: '#FFF',
//     paddingHorizontal: 10,
//   },
//   logoContainer: {
//     alignItems: 'center',
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   logo: {
//     width: 200,
//     height: 200
//   },
//   buttonContainer: {
//     backgroundColor: '#2980b9',
//     paddingVertical: 10,
//     width: 240,
//     height: 45,
//     borderRadius: 200,
//     alignItems: 'center',
//     flexGrow: 1,
//     justifyContent: 'center',
//     marginLeft: 60,
//   },
//   buttonContainerFB: {
//     backgroundColor: '#2980b9',
//     paddingVertical: 10,
//     width: 240,
//     height: 45,
//     borderRadius: 200,
//     alignItems: 'center',
//     flexGrow: 1,
//     justifyContent: 'center',
//     marginLeft: 60,
//     marginTop: 30
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: '#FFFFFF',
//   },
// });