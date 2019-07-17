import React, { Component } from "react";
import {
  Button,
  ThemeProvider,
  Header,
  CheckBox,
  Input
} from "react-native-elements";
import { Location, Permissions, ImagePicker } from "expo";
// import CheckBox from 'react-native-check-box'
import { Icon } from "react-native-elements";
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
      resLabel: "",
      Show: false,
      location: null,
      data: "",
      delta: 0.1,

      address: "",
      latitude: 37.78825,
      longitude: -122.4324,
      eventname: "",
      eventabout: "",
      img: "1"
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
        img: this.state.img
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
        <View style={styles.main}>
          <View style={styles.paragraph}>
            <Text style={styles.text}>
              האפליקציה באה לתת מענה לכל אדם אשר מחפש מקום בילוי או מעוניין
              לפרסם מקום בילוי.
            </Text>
          </View>
          <Text style={styles.text}>
            .באמצעות האפליקציה שפיתחנו, כל אדם יכול למצא מקום בילוי בקלות רבה
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 10
  },
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,.3)"
  },
  text: {
    fontSize: 20,
    color: "black",
    height:200,
  },
  paragraph:{
    height:250,
  },
  cardImage: {
    width: 235,
    height: 130
  }
});
