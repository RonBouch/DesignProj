import React, { Component } from "react";
import {
  Button,
  ThemeProvider,
  Header,
  CheckBox,
  Input
} from "react-native-elements";
import styles from "./pageStyle";
import { Location, Permissions, ImagePicker } from "expo";
// import CheckBox from 'react-native-check-box'
import { Icon } from "react-native-elements";
import { ActionButton } from "react-native-material-ui";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ImageBackground,
  Image,
  TouchableOpacity
} from "react-native";
const { height, width } = Dimensions.get("window");

export default class Public extends React.Component {
  constructor(props) {
    super(props);

    let formIsValid = false;
    this.state = {
      errors: {},
      resLabel: "...",
      Show: false,
      location: null,
      checkedB: true,
      checkedR: false,
      data: "",
      delta: 0.1,

      address: "",
      latitude: 37.78825,
      longitude: -122.4324,
      eventname:"",
      eventabout:"",
      img: "1"
    };
  }
  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  openCamera = () => {
    this.props.navigation.navigate("Camera");
  };

  openGallery = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3]
    // });
    // if (!result.cancelled) {
    //   this.setState({ img: result.uri });
    //   alert(img);
    // }
  };

  handleSubmit = async () => {
    if (this.isValid()) {
      const { address } = this.state;
      var detials = address.split(",", 2);
      console.log("detials = " + detials);
      if (detials[1] !== "") {
        this.setState({
          delta: 0.01
        });
      } else {
        this.setState({
          delta: 0.2
        });
      }
      if (
        (await Location.geocodeAsync(address)) == "" ||
        (await Location.geocodeAsync(address)) == null
      ) {
        alert("Invalid city");
        return;
      }
      let geocode = await Location.geocodeAsync(address);
      console.log("geocode  = " + geocode[0].latitude);

      this.setState({
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude
      });
      console.log("latitdue  = " + this.state.latitude);

      const data = {
        address: this.state.address,
        lati: this.state.latitude,
        longi: this.state.longitude,
        eventname:this.state.eventname,
        eventabout:this.state.eventabout,
        img:this.state.img
      };
      console.log(data);
      console.log('event about event name '+this.state.eventname+this.state.eventabout );

      fetch(
        "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/InsertEvent",
        {
          method: "post",
          headers: new Headers({
            "Content-Type": "application/json;"
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
                lblerr: ":("
              });
              return;
            } else {
              this.props.navigation.navigate("HomeMenuView");

            }
            console.log("1 = " + u.ID);
          },
          error => {
            console.log("err post=", error);
          }
        );
    } else {
      alert("Invalid city");
    }
  };

  isValid() {
    let valid = false;
    const { address } = this.state;
    if (address.length !== 0) {
      valid = true;
    }
    return valid;
  }
  btnPublic = () => {
    //   if(this.handleSubmit()){
    //       alert('Yessss')
    //   }
    //   else{
    //       alert('No')
    //   }
  };
  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View style={styles.Header}>
          <View style={{ marginTop: 30, flexDirection: "column-reverse" }}>
            <Button
              onPress={() => {
                this.props.navigation.navigate("HomeMenuView");
              }}
              success
              type="outline"
              icon={<Icon name="arrow-back" />}
            />
            <Text>חזרה</Text>
          </View>

          <View>
            <Input
              placeholder="שם האירוע"
              containerStyle={{ width: 300 }}
              errorMessage="שם האירוע"
              rightIcon={<Icon name="account-circle" size={24} color="black" />}
              onChangeText={(e)=>this.setState({eventname:e})}
            />
            <Text style={{ color: "red" }}>{this.state.errors.fname}</Text>
          </View>

          <View>
            <Input
              placeholder="כתובת האירוע"
              containerStyle={{ width: 300 }}
              errorMessage="כתובת האירוע"
              onChangeText={this.handleAddress}
              rightIcon={<Icon name="account-circle" size={24} color="black" />}
            />
          </View>

          <View>
            <Input
              containerStyle={{ width: 300 }}
              placeholder="ספר על האירוע"
              errorStyle={{ color: "red" }}
              errorMessage="ספר על האירוע"
              onChangeText={(e)=>this.setState({eventabout:e})}

              rightIcon={<Icon name="account-circle" size={24} color="black" />}
            />
          </View>

          <View style={styles.addImage}>
            <TouchableOpacity onPress={this.openCamera} style={styles.icon}>
              <View>
                <Ionicons name="ios-camera" size={60} color="black" />
              </View>
              <Text>מצלמה</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.openGallery} style={styles.icon}>
              <View>
                <Ionicons name="md-images" size={60} color="black" />
                <Text>גלריה</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={{ color: "red" }}>{this.state.errors.address}</Text>
          </View>

          <Button onPress={this.handleSubmit} title="Confirm identity" />

          {!this.state.Show && (
            <Text style={{ color: "red" }}> {this.state.resLabel}</Text>
          )}
        </View>
      </ImageBackground>
    );
  }
}
