import React from 'react';
import { Text, View, StyleSheet, Image, KeyboardAvoidingView, Alert,Button } from 'react-native';
import styles from './SearchPageStyle';
import { Facebook } from 'expo';

export default class FaceBookPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            token: null,
            photoUrl: null
        }

        this.appId = '365959520710671';
    }

    btnLoginFB = async () => {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync(this.appId, {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                //after getting the token we can use a simple fetch against the facebook API 
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${token}`);
                let res = await response.json();
                this.setState({ token: token });
                Alert.alert('Logged in!', `Hi NAME: ${res.name}!\nEMAIL: ${res.email}\nPICTURE: ${res.picture}\nRES:${JSON.stringify(res)} `);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    };

    btnFetch_PersonPicture = () => {
        // POST adds a random id to the object sent
        fetch(`https://graph.facebook.com/me?fields=picture&access_token=${this.state.token}`, {
            method: 'POST',
            body: '',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json != null) {
                    this.setState({ photoUrl: json.picture.data.url });
                alert(`picture= ${json.picture}\npicture.data.url= ${(json.picture.data.url)}\nRES=${JSON.stringify(json)}`);
                } else {
                    this.setState({ lblErr: true });
                }
            });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding"
                style={styles.container}>
                <View style={styles.Header}>
                    <Text style={styles.textBig}>FaceBook Page PG</Text>
                    <Image
                        style={{ alignSelf: 'center', width: 100, height: 100 }}
                        source={require('../Images/facebook.png')} />
                    <View style={{ margin: 10, justifyContent: 'flex-start' }}>
                        <Button
                            title="Go to Home Page"
                            icon="arrow-back"
                            upperCase={false}
                            onPress={() => {
                                this.props.navigation.navigate('Home');
                            }} />
                    </View>
                </View>
                <View style={styles.Content}>
                    <View style={stylesCP.placeHolder}>
                        <Image
                            style={stylesCP.image}
                            source={{ uri: this.state.photoUrl }}
                        ></Image>
                    </View>
                    <View style={{ margin: 20 }}>
                        <Button
                            title="FB Login - Get the Token"
                            icon="lock-open"
                            style={{ margin: 20 }}
                            onPress={this.btnLoginFB}
                        />
                    </View>
                    <View style={{ margin: 20 }}>
                        <Button
                            title="FB Get Picture - using the Token"
                            icon="people"
                            style={{ margin: 20 }}
                            onPress={this.btnFetch_PersonPicture}
                        />
                    </View>
                </View>
            </KeyboardAvoidingView >
        );
    }
}

const stylesCP = StyleSheet.create({
    placeHolder: {
        flex: 0.3,
        width: 100,
        borderColor: 'black',
        borderWidth: 1,
        margin: 10
    },
    image: {
        flex: 1,
        //width: 300
    }
}); 