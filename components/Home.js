import React, { Component} from 'react'
import { Button } from 'react-native'
import { TouchableOpacity, Picker, StyleSheet, View, Text,Image,Alert, Dimensions } from 'react-native'
import { WheelPicker, DatePicker, TimePicker} from 'react-native-wheel-picker-android'
import { StackNavigator } from 'react-navigation';


const Home = () => {
    const navigationOptions = {
        title: 'welcome',
    };
    // Class Variables
    var hour_value = 0; 
    let { width, height } = Dimensions.get('window');
  
  // When the submit button is triggered call the next page, and set the state
   _onPressButton = () => {
       Alert.alert("The Selected Time is:" + this.hour_value);
   }
   // When the Hour Picker wheel changes set the hour_value
   // variable to be returned in view2
     _setHour = (hour) => {
        this.hour_value = hour;
        console.log("Hour is: " + this.hour_value);
   }
   // Getter method to return hour_value.. Doesn't work :-(
   _getHour = () => {
       return this.hour_value;
   }


   //Used to let the user select the number of hours volunteered
   let arr = ["1 Hour","2 Hours","3 Hours"
            ,"4 Hours","5 Hours","6 Hours"
            ,"7 Hours","8 Hours","9 Hours"
            ,"10 Hours","11 Hours","12 Hours"];
   let now = new Date();


       return (

      
         <View // source={require('./img/paws-screen2-bg.png')}
          style = {[styles.container]}>
        {/*
            * HEADER 
        */}
            <Text style = {styles.header}>
                Please enter your volunteer time below
            </Text>

        {/*
            * DATE PICKER
        
        <DatePicker
        initdate={now.toISOString()}
        onDateSelected={ (date) => this.onDateSelected(date)}
        style = {styles.datePicker}
        />
        */}
    
        
        {/*
            * TIME PICKER
        */}
        
         <View style={styles.wp_view}>
                <WheelPicker
                    onItemSelected={(event) => {_setHour(event["data"])}}
                    isCurved
                    visibleItemCount={2}
                    itemSpace={1}
                    itemStyle={{color:"red", fontSize:200}}
                    selectedItemPosition={0}
                    data={arr}
                    style = {styles.wheelpicker}
                />
                
                
        </View>
    

        {/*
            * SUBMIT BUTTON
        */}
            <TouchableOpacity onPress={_onPressButton} style = {styles.submit}>
                <Text style = {styles.text}>
                    Submit 
                </Text>
            </TouchableOpacity>
            
           
       
        </View>
    );
}
export default Home

const styles =  StyleSheet.create({
        
        container: { 
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',

    },
    bgImg:{
        flex:1
    },
    label:{
        color: "white",
        fontSize: 15,
        marginBottom:10,
        marginTop:70,
    },
    wp_text:{
        

    },
    wp_view:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        width:150,
        height:150,
        borderWidth:3,
        borderRadius: 300,
        borderColor: "white",
        
        marginTop: 100,
        marginBottom: 100,
        paddingTop:10,
        paddingBottom:10,
       

    
    },
    wheelpicker: {
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        width:140, 
        height:120,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 500,
        borderColor: "white",
        borderWidth:2
      
    },
    datePicker: {
        width: 50,
        height: 100,
        marginBottom: 10,
        marginTop: 10,
        paddingLeft: 500,
        backgroundColor: 'white'

    },
     header: {
        alignItems: 'flex-start',
         textAlign: 'center',
         color: 'white',
         fontSize: 18
         
     },
     picker: {
         backgroundColor: '#E5E5E5'
     },
    submit: {
       justifyContent: 'flex-end',
       width: 200,
       marginBottom: 25,
       height: 75,
       backgroundColor: 'white',
       borderRadius: 50,
    
    },

    text: { 
        width: 200,
        height: 75,
        borderRadius: 50,
        padding: 20,
        paddingTop: 15,
        fontSize: 30,
        textAlign: 'center',
    }
})