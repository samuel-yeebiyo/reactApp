import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, Button, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../components/Item';
import Navigator from '../routes/welcomeStack'


function HomeScreen({navigation}){
    return (
      <View style={styles.main}>
        <View style={styles.hero}>
            <Text style={styles.bigText}>COVID-19 Vaccination Information System</Text>
            <Text style={styles.info}>Create an account to start booking and tracking your vaccine information</Text>
            <Text style={styles.info}>Continue without an account to check available bookings and query information</Text>
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity>
                <Text style={styles.continue} onPress={()=>navigation.navigate('Sign In')}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.access}>
                <TouchableOpacity style={styles.buttonLeft} onPress={()=>navigation.navigate('Register')}>
                    <Text style = {styles.buText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonRight} onPress={()=>navigation.navigate('Sign In')}>
                    <Text style = {styles.buText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F6f3e9',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center'
    },
    hero:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:'50%'
    },
    bigText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#000"
    },
    info:{
        marginTop:25,
        fontSize:15,
        textAlign:'center',
        color:"#000"

    },
    buttons:{
        position:'absolute',
        bottom:60,
        width:'100%',
    },
    continue:{
        textAlign:'center',
        height:20,
        color:"#000",
        textDecorationLine:'underline',
        fontSize:18,
    },
    access:{
        flexDirection:'row',
        marginTop:30,
        height:70,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    buttonLeft:{
        height:60,
        width:120,
        backgroundColor:'#f95a64',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'flex-end',
        position:'relative',
        paddingRight:40,
        left:30,
        zIndex:1
    },
    buttonRight:{
        height:60,
        width:150,
        backgroundColor:'#a74b4b',
        borderRadius:25,
        position:'relative',
        right:30,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingRight:35
    },
    buText:{
        textAlign:'center',
        color:'#FFF'
        
    }

    


})

export default HomeScreen;