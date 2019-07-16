import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import * as Expo from "expo"
//import Expo from "expo"

const WSURL = 'http://ruppinmobile.tempdomain.co.il/site20/WSUsers.asmx';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      FirstName: "",
      photoUrl: "",
      Email: "",
    }
  }
  signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId:
        "135412253455-6ep88ehld8lcfch6g6ik6llgk326m3fj.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          FirstName: result.user.name,
          photoUrl: result.user.photoUrl,
          Email: result.user.email,
          
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }

    fetch(WSURL + '/Google', {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json;',
      }),
      body: JSON.stringify({
        FirstName: FirstName,
        Email: Email,
      })
    })
    console.log("FirstName=", FirstName)
      .then(res => {
        console.log('res=', res);
        return res.json()
      })
      .then((response) => response.json)
        .then((responseJson) => {
          alert(responseJson);
        })
        .catch((error)=>{
          console.error(error);
        })
        
  }


  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage FirstName={this.state.FirstName} photoUrl={this.state.photoUrl} Email={this.state.Email} />
        ) : (
          <LoginPage signIn={this.signIn} />
      
        )}
        <Button title="Go to app" onPress={() => this.props.navigation.navigate('SearchPage')}/>
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.FirstName} email:{props.Email}</Text>

      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25,
    paddingTop: 30,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
})