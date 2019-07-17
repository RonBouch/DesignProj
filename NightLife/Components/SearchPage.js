import React from "react";
import {
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import styles from "./SearchPageStyle";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Location, Permissions } from "expo";
import { ActionButton } from "react-native-material-ui";
import { MapView } from "expo";


const { Marker } = MapView;

export default class PartyPage extends React.Component {
  constructor(props) {
    super(props);

    // let userId = this.props.navigation.state.params;
    // console.log('userID=',this.props.navigation.state.params.id)
    this.state = {
      latitude: 37.78825,
      longitude: -122.4324,
      delta: 0.1,
      address: "",
      location: null,
      places: null,
      show: false,
      pageToShow: null,
      showNumber:false,
      checkedB: false,
      place: null
    };
    this.viewPage = null;
  }
  componentDidMount() {
    this.btnLocation();
    this.GetPlaces();
  }

  handleAddress = e => {
    this.setState({
      address: e
    });
  };

  handleSubmit = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
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

      let geocode = await Location.geocodeAsync(address);
      console.log("geocode  = " + geocode[0].latitude);

      this.setState({
        latitude: geocode[0].latitude,
        longitude: geocode[0].longitude
      });
      console.log("latitdue  = " + this.state.latitude);
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

  btnLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const output =
          "latitude=" +
          position.coords.latitude +
          "\nlongitude=" +
          position.coords.longitude +
          "\naltitude=" +
          position.coords.altitude +
          "\nheading=" +
          position.coords.heading +
          "\nspeed=" +
          position.coords.speed;
        console.log(output);

        this.setState({
          latitude: position.coords.latitude, // +  Math.random()/1000,
          longitude: position.coords.longitude
        });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  GetPlaces = () => {
    fetch(
      "http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/GetPlaces",
      {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/Json;"
        })
        // body: JSON.stringify(data)
      }
    )
      .then(res => {
        console.log("res=", res);
        return res.json();
      })
      .then(
        result => {
          console.log("fetch POST= ", result);
          let places = JSON.parse(result.d);
          if (places == null) {
            this.setState({
              message: "הרשמה נכשלה"
            });
            return;
          } else {
            console.log("U = " + places);
            this.setState({
              places: places
            });
          }
          console.log(result.d);
          console.log(result);
        },
        error => {
          console.log("err post=", error);
        }
      );
  };

  infoWindow = (p, i) => {
    // console.log('page to show  -- -- - = = == '+ p.City+i)

    if (this.state.pageToShow == null || this.state.pageToShow != i) {
      this.setState({
        pageToShow: i,
        place: p,
        showNumber:false
      });
    } else {
      this.setState({
        pageToShow: null,
        place: null,
        showNumber:false
      });
    }
  };
  _pressCall=()=>{
    const url='tel:'+this.state.place.EventPhone
    Linking.openURL(url)
  }
  render() {
    let markers = [];

    if (this.state.places != null) {
      debugger;
      markers = this.state.places.map((place, index) => {
        if (index == this.state.pageToShow) {
          this.viewPage = place.Address;
        }
        return (
          <Marker
            coordinate={{
              latitude: parseFloat(place.Lati),
              longitude: parseFloat(place.Longi)
            }}
            onPress={() => {
              this.infoWindow(place, index);
            }}
            key={index}
          >
            {index == this.state.pageToShow ? (
              <Icon name="user" color="blue" size={30} />
            ) : (
              console.log("ccccccc")
            )}
          </Marker>

          //       index==this.state.pageToShow?
          //   <View style={styles.card} key={index}>
          //             <View style={{height:'35%'}}>
          //             <Image
          //               source={require('../assets/party1.jpg')}
          //               style={styles.cardImage}
          //               resizeMode="cover"
          //             />
          //             </View>
          //             <View  style={{}}>
          //             <CheckBox
          //         center
          // title=' מועדפים'
          // iconRight
          // iconType='material'
          // checkedIcon='done'
          // uncheckedIcon='add'
          // checkedColor='yellow'
          // checked={this.state.checkedB}
          // onPress={() => this.setState({checkedB: !this.state.checkedB})}/>

          //             </View>
          //             <View style={{}}>
          //               <Text>
          //               {place.Address}'\n'
          //                  מס 0523665524
          //                 פתוח 24//7
          //                 </Text>
          //             </View>
          //           </View>
        );
      });
    }

    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View
          style={{ marginTop: 30, backgroundColor: "rgba(255,255,255,.3)" }}
        >
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-left" size={24} />
          </TouchableOpacity>
        </View>
        <View style={styles.Header}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/smalllogo.png")}
              style={styles.cardImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={{fontSize:20}}>לאן יוצאים... </Text>

            <View>
              <TextInput
                style={styles.input}
                onChangeText={this.handleAddress}
                value={this.state.Address}
                placeholder="הכנס כתובת"
              />
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.handleSubmit}
            >
              <Text style={{fontSize:15}}>חפש לי מסיבה</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.Content}>
            <View
              style={{
                borderColor: "black",
                borderWidth: 2
              }}
            >
              <MapView
                style={{
                  flex: 1,

                  width: Dimensions.get("window").width - 30
                }}
                region={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0322,
                  longitudeDelta: 0.0321
                }}
              >
                {markers}
                <Marker
                  coordinate={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude
                  }}
                  title="my place:)"
                  description="here i am"
                  color="blue"
                 
                />
               

              </MapView>
            </View>

            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: Dimensions.get("window").width - 10,
                flexDirection: "row-reverse"
              }}
            >
              <ActionButton icon="place" onPress={this.btnLocation} />
            </View>

            {this.state.pageToShow != null ? (
              <View style={styles.card}>
                <ImageBackground
                  source={require("../assets/5.jpg")}
                  style={{ width: "100%", height: "100%" }}
                >
                  <View
                    style={{
                      backgroundColor: "rgba(255,255,255,.6)",
                      height: "100%"
                    }}
                  >
                    <View style={{ flexDirection: "row-reverse" }}>
                      <View>
                        <Image
                          source={{
                            uri:
                              "http://ruppinmobile.tempdomain.co.il/site11/image/"+this.state.place.Img
                          }}
                          style={{ width: 130, height: 100 }}
                          resizeMode="cover"
                        />
                      </View>
                      <View style={{ flex: 2 }} />
                      <View>
                        <Text
                          style={{ fontSize: 18, fontWeight: "bold", flex: 2 }}
                        >
                          {this.state.place.Address}
                        </Text>
                        <Text
                          style={{ fontSize: 16, fontWeight: "bold", flex: 2 }}
                        >
                          שם המקום:{this.state.place.EventName}
                        </Text>
                      </View>
                    </View>
                    <View>
                      <Text style={{ fontSize: 14, fontWeight: "bold" }}>
                        מידע על האירוע : {this.state.place.EventAbout}{" "}
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row-reverse", bottom:5 }}>
                      <View style={{ flex: 1 }} />
                      <View style={{ flex: 2, marginTop: 10 }}>
                      {this.state.showNumber!=true?  <TouchableOpacity
                          onPress={this._pressCall}
                          success
                          type="outline"
                        >
                          <Icon name="phone" color="green" size={40} />
                        </TouchableOpacity>:<Text style={{color:'blue',fontSize:18,marginLeft:30}}>0526666666</Text>}
                      </View>
                      <View>
                        <CheckBox
                          title=" מועדפים"
                          style={{ position: "absolute", flex: 3 }}
                          iconRight
                          iconType="material"
                          checkedIcon="star"
                          uncheckedIcon="star"
                          checkedColor="yellow"
                          checked={this.state.checkedB}
                          onPress={() =>
                            this.setState({ checkedB: !this.state.checkedB })
                          }
                        />
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ) : (
              console.log("mjcjcjc")
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}
