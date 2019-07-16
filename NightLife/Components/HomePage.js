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

  logOut = () => {
    global.id = 0;
    this.props.navigation.navigate("LoginPage");
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/backGroung.jpg")}
        style={styles.container}
      >
        <View style={{ padding: 20 }}>
          <Image
            source={require("../assets/smalllogo.png")}
            style={styles.cardImage}
            resizeMode="cover"
          />
        </View>

        {/* <View style={{alignItems:"center",textAlign:'center',position:'absolute',height:'100%',width:'100%'}}>
        <Image source={require('../assets/smalllogo.png')}style={{}}/>

        </View> */}
        <View style={styles.inner}>
          <View style={styles.formContainer}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("SearchPage")}
            >
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "https://weezevent.com/wp-content/uploads/2019/01/12145054/organiser-soiree-1000x585.jpg"
                }}
              />
              <Text style={styles.info}> חיפוש</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => this.props.navigation.navigate("PublishPage")}
            >
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "https://websem.co.il/wp-content/uploads/2018/04/form-tracking1.png"
                }}
              />
              <Text style={styles.info}>פרסום אירוע</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL2Taw-4Pg52Cs97nN5DtjAIihTR4gnImf-n58-Ipq-PcCT5ik"
                }}
              />
              <Text style={styles.info}>הפרופיל שלי</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("AboutUsPage")}
              style={styles.buttonContainer}
            >
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "data:image/jpeg;base64,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"
                }}
              />
              <Text style={styles.info}>About Us</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonContainer}>
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "https://i1.wp.com/emmastraveltales.co.uk/wp/wp-content/uploads/2017/08/My-Place.png?fit=940%2C788&ssl=1"
                }}
              />
              <Text style={styles.info}>המועדפים שלי</Text>
              <Text style={styles.info}>{}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={this.logOut}
            >
              <Image
                style={styles.icon}
                source={{
                  uri:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI98c4L4jTsAB6-foYsXFLS9d8zOyVxqtTfF-hh3Qd67vcn4Tf"
                }}
              />
              <Text style={styles.info}>התנתק</Text>
              <Text style={styles.info}>{}</Text>
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
    alignItems: "center",
    paddingTop: 40
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
    backgroundColor: "rgba(255,255,255,.5)",
    borderRadius: 200,
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    margin: 10,
    marginTop: 10
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
  info: {
    fontWeight: "bold"
  }
});
