
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';


/**
 *  The Login component is where the user will sign into their google account
 *  before continuing to enter their volunteer hours.
 */
class Login extends Component {
    static navigationOptions = {header:null}
    constructor(props){
        super(props);
        this.state = {
            user: null,
            visibleLogin: false,
            visibleLogout: false
        };
    }
    /**
     * Upon mounting sets up the google authentication thread.
     */
    componentWillMount(){
        this._setupGoogleSignin();
    }
    /**
     * Creates the page and returns it based on weather the user is logged in or not. 
     */
    render() {

        const {params} = this.props.navigation.state;
        /**
         * If the page was navigated to from the home screen isLoggedOut will be true
         * and the sign out function will be called.
         */
        if(params){
            if(params.isLoggedOut){
                this.setState({visibleLogout: true})
                this._signOut();
                params.isLoggedOut = false;
            }
        }
        /**
         * User will only be set if a google account is signed in. If no user is found 
         * displays the page that the user can log in to. 
         */
        if(!this.state.user){
            console.log("Login.js -- No User found, display Gmail Login Button");
            return(
                <View style={styles.container}>
                    <Spinner visible = {this.state.visibleLogin} textContent={'Signing into Google...'} textStyle={{color: '#FFF'}} overlayColor = {'rgba(0, 0, 0, 0.7)'} />
                    <Spinner visible = {this.state.visibleLogout} textContent={'Signing out of Google...'} textStyle={{color: '#FFF'}} overlayColor = {'rgba(0, 0, 0, 0.7)'} />
                    <Image source = {require('./img/paws-screen1-bg.png')} style = {styles.bgImgContainer}>
                        <View style = {styles.loginView}>
                            <TouchableOpacity onPress = { () => {this._signIn();}} style = {styles.buttonContainer}>
                                <Image source = {require('./img/google_button_icon.png')} style = {styles.buttonImage} />
                                <Text style = {styles.buttonText}>
                                    Sign in with Google
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Image>
                </View>
            );
        }
        /**
         * Once a user has logged in, or if a user is logged in from a previous session redirects to the
         * home page so hours can be input.
         */
        if(this.state.user) {
            return this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home', params: {user: this.state.user}})); 
        }
    }

    /**
     * Sets up the thread used for Goolge sign in.
     */
    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true});
            await GoogleSignin.configure({
                webClientId: '1076761594654-utkunpdbm4e30voj0kvuinr1v3s70ibt.apps.googleusercontent.com',
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            this.setState({user: user});
        }
        catch(err) {
            console.log("Play services error", err.code, err.message); 
        }
    }
    /**
     * Sets the state for the user upon return of a sucessful Google sign in.
     */
    _signIn() {
        this.setState({visibleLogin: true});
        GoogleSignin.signIn()
        .then((user) => {
            this.setState({visibleLogin: false});
            this.setState({user: user});
        })
        .catch((err) => {
        console.log('WRONG SIGNIN', err.stack);
        })
        .done();
  }
  /**
   * Signs the current user out of Goole.
   */
  _signOut() { 
    // GoogleSignin.revokeAccess().then(() => 
    GoogleSignin.signOut().then(() =>{
        this.setState({visibleLogout: false});
        this.setState({user: null});
    }).then(GoogleSignin.revokeAccess())
    .done();
    }
}

export default Login;

const styles = StyleSheet.create({

    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    txt: {
        fontSize: 18, 
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        marginBottom: 20
    },
    loginView : {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    bgImgContainer:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        resizeMode: 'contain'
    },
    buttonImage:{
        width: 48,
        height: 48,

    },
    buttonText:{
        fontFamily: 'Roboto',
        textAlign: 'center',
        fontSize: 24,
        color: 'white',
        paddingTop: 8,
        paddingLeft: 24

    },
    buttonContainer:{
        paddingTop: 15,
        flexDirection: 'row',
        height: 75,
        justifyContent: 'center',
        backgroundColor: '#4285F4',
        }
});

