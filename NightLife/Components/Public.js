import React, { Component } from 'react'
import {Button,ThemeProvider,Header,CheckBox,Input} from 'react-native-elements';
import styles from './pageStyle';
import { Location, Permissions } from "expo";
// import CheckBox from 'react-native-check-box'
import { Icon } from 'react-native-elements';
import { ActionButton } from 'react-native-material-ui';

import { StyleSheet, Text, View, TextInput ,Dimensions,ImageBackground,Image} from 'react-native';
const {height, width} = Dimensions.get('window');

export default class Public extends React.Component {
    constructor(props) {
        super(props);

         let formIsValid = false;
        this.state =
            {
                errors: {},
                resLabel: '...',
                Show: false,
                latitude: 37.78825,
                longitude: -122.4324,
                checkedB:true,
                checkedR:false,
                data:"",
                delta: 0.1,
                city:"",
                location:null
          
            };


    }
    handlecity = e => {
        this.setState({
          city: e
        });
       
      };

      handleSubmit = async () => {
        if (this.isValid()) {
            const { city } = this.state;
            var detials = city.split(",", 2);
            console.log("detials = " + detials)
            if (detials[1] !== "") {
              this.setState({
                delta: 0.01
              });
            } else {
              this.setState({
                delta: 0.2
              });
            }
            if(await Location.geocodeAsync(city)==""||await Location.geocodeAsync(city)==null){
                alert("Invalid city");
                return ;
            }
            let geocode = await Location.geocodeAsync(city);
            console.log("geocode  = " + geocode[0].latitude)
      
            this.setState({
              latitude: geocode[0].latitude,
              longitude: geocode[0].longitude
            });
            console.log("latitdue  = " + this.state.latitude)
      
            const data = {
                city:this.state.city,
            lati:this.state.latitude,
            longi:this.state.longitude,

            };
            console.log(data)
            fetch('http://ruppinmobile.tempdomain.co.il/site11/WebService.asmx/InsertPlace', {
                method: 'post',
                headers: new Headers({
                    'Content-Type': 'application/json;',
                }),
                
                body: JSON.stringify(data)
              })
                  .then(res => {
                      console.log('res=', res);
                      return res.json()
                  }).then((result) => {
                      console.log("fetch POST= ", result);
                      let u = JSON.parse(result.d);
                      console.log("u = " + u);
                      if (u == null) {
                          console.log("ASffasasf")
                          this.setState({
                              lblerr: ":("
                          })
                          return;
                      }
                      else {
                        this.setState({
                          data:u.ID,
                        })
                      }
                      console.log("1 = " + u.ID);
        
                      
                  },
                      (error) => {
                          console.log("err post=", error);
                      });


          } else {
            alert("Invalid city");
          }
             
    }
         
      isValid() {
        let valid = false;
        const { city } = this.state;
        if (city.length !== 0) {
          valid = true;
        }
        return valid;
      }
      btnPublic=()=>{
        //   if(this.handleSubmit()){
        //       alert('Yessss')
        //   }
        //   else{
        //       alert('No')
        //   }
       
 
      }
    render() {
        return (
            <ImageBackground source={require('../assets/backGroung.jpg')}style={styles.container}>

            <View style={styles.Header}> 

              <View style={{marginTop:30,flexDirection:"column-reverse"}}>
                 <Button  onPress={()=>{this.props.navigation.navigate('HomeMenuView');}} success type="outline" icon={<Icon name='arrow-back' />}   />
               <Text>חזרה</Text>
               </View>
                  
                    <View>
                    <Input
                    placeholder='שם האירוע'
                    containerStyle={{width:300}}
                    errorMessage='שם האירוע'
                    rightIcon={
                        <Icon  name='account-circle' size={24} color='black' />  }
                              onChangeText={this.txtFNameValue}/>
                     <Text style={{ color: 'red' }}>{this.state.errors.fname}</Text>
                    </View>  

              
                    <View>
                    <Input
                    placeholder='כתובת האירוע'
                    containerStyle={{width:300}}
                    errorMessage='כתובת האירוע'
                    onChangeText={this.handlecity}
                    rightIcon={
                        <Icon
                            name='account-circle'
                            size={24}
                            color='black'
                        />
                    }
                />
                    </View>
                    <View>
                 
                    <Input
             containerStyle={{width:300}}
             placeholder='ספר על האירוע'
             errorStyle={{ color: 'red' }}
              errorMessage='ספר על האירוע'
              rightIcon={
             <Icon
          name='account-circle'
            size={26}
          color='black'
            />
           }
/>
                    </View>
       
                    <View>
           

   <Image
style={{
    paddingVertical: 30,
    width: 60,
    height: 60,
    borderRadius: 60
  }}       
  resizeMode='cover'
  source={{uri: 'http://www.divarchi.com/img/upload-icon.png'}}
        />
                     <Text style={{ color: 'red' }}>{this.state.errors.city}</Text>

                    </View>


                 
                    <Button onPress={this.handleSubmit} title="Confirm identity"></Button>
                  

                    {!this.state.Show && <Text style={{ color: 'red' }}> {this.state.resLabel}</Text>}


            </View>
</ImageBackground>
        )
    }
    
}

