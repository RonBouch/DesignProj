import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
export default class HomeMenuView extends React.Component {
  constructor(props) {
    super(props);
    let userId = this.props.navigation.state.params;
    console.log("userID= " + JSON.stringify(userId));
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View style={{padding:20}}>
          <Image
            source={require("../assets/smalllogo.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.inner}>
          <View style={styles.formContainer}>
            
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 60
  },
  cardImage: {
    width: 255,
    height: 140
  },
  inner: {
    width: "80%",
    height: "100%"
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 200
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
    margin: 30
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
    backgroundColor: "rgba(255,255,255,.3)",
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    margin: 10,
    marginTop: 20
  },
  formContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: 150
  },
  buttonContainerFB: {
    backgroundColor: "#2980b9",
    paddingVertical: 10,
    width: 240,
    height: 45,
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    marginTop: 30
  },
  info: {}
});
