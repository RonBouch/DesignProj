import React, { Component } from "react";
import {
  Button,
  ThemeProvider,
  Header,
  CheckBox,
  Input,
} from "react-native-elements";
import styles from "./SearchPageStyle";
import { Location, Permissions, ImagePicker } from "expo";
// import CheckBox from 'react-native-check-box'
import { Icon } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
const { height, width } = Dimensions.get("window");

const DissmisKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class Public extends React.Component {
  constructor(props) {
    super(props);

    let formIsValid = false;
    this.state = {
      errors: {},
      resLabel: "",
      Show: false,
      location: null,
      data: "",
      delta: 0.1,
      eventphone:"",
      address: "",
      latitude: 37.78825,
      longitude: -122.4324,
      eventname: "",
      eventabout: "",
      img: "party3.jpg"
    };
  }
  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false, // higher res on iOS
      aspect: [4, 3]
    });

    if (result.cancelled) {
      return;
    }

    let localUri = result.uri;
    let filename = localUri.split("/").pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append("photo", { uri: localUri, name: filename, type });
    console.log("formdata = ", formData);
    return await fetch("http://ruppinmobile.tempdomain.co.il/site11/image", {
      method: "POST",
      body: formData,
      header: {
        "content-type": "multipart/form-data"
      }
    });
  };

  openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });
    if (!result.cancelled) {
      console.log("result ", result);
      this.setState({ img: result.uri });
      alert(this.state.img);
    }
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
        this.setState({
          resLabel: "*עיר או רחוב לא תקינים, נסה שוב!"
        });
        return;
      }
      if (this.state.eventabout == "" || this.state.eventname == "") {
        this.setState({
          resLabel: "*אנא מלא את כל השדות!."
        });
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
        eventname: this.state.eventname,
        eventabout: this.state.eventabout,
        img: this.state.img,
        eventphone:this.state.eventphone
      };
      console.log(data);
      console.log(
        "event about event name " + this.state.eventname + this.state.eventabout
      );

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
              this.props.navigation.navigate("HomePage");
            }
          },
          error => {
            console.log("err post=", error);
          }
        );
    } else {
      this.setState({
        resLabel: "*אנא מלא את כל השדות"
      });
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

  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View
          style={{
            marginTop: 10,
            backgroundColor: "rgba(255,255,255,.3)",
            padding: 10
          }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="md-arrow-back" size={28} />
          </TouchableOpacity>
        </View>


        <View
          style={{
            alignItems: "center",
            backgroundColor: "rgba(255,255,255,.3)"
          }}
        >
          <Image
            source={require("../assets/smalllogo.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        
        <View style={styles.Header}>
          <View>
            <Input
              containerStyle={{ width: 300 }}
              errorMessage="*ציין את שם האירוע המלא"
              rightIcon={<Entypo name="edit" size={20} />}
              onChangeText={e => this.setState({ eventname: e })}
            />
          </View>

          <View>
            <Input
              containerStyle={{ width: 300 }}
              errorMessage="*ציין את הכתובת המדוייקת של האירוע"
              onChangeText={this.handleAddress}
              rightIcon={<Entypo name="location" size={20} />}
            />
          </View>

          <View>
            <Input
              containerStyle={{ width: 300 }}
              errorStyle={{ color: "red" }}
              errorMessage="*טלפון להזמנת מקום"
              onChangeText={e => this.setState({ eventphone: e })}
              rightIcon={<AntDesign name="mobile1" size={20} />}
            />
          </View>
          <TextInput
            style={styles.TextInputStyleClass}
            underlineColorAndroid="transparent"
            placeholder={"ספר על האירוע"}
            placeholderTextColor={"#9E9E9E"}
            numberOfLines={10}
            multiline={true}
            onChangeText={e => this.setState({ eventabout: e })}

          />

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

          <TouchableOpacity
              style={styles.publishButton}
              onPress={this.handleSubmit}
            >
              <Text style={{ color: "white" }}>פרסם אירוע</Text>
            </TouchableOpacity>


          {!this.state.Show && (
            <Text style={{ color: "red" }}> {this.state.resLabel}</Text>
          )}
        </View>
      </ImageBackground>
    );
  }
}
