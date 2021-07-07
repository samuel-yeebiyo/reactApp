import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, Button, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Item from '../components/Item';
import Navigator from '../routes/welcomeStack'

function transit({ route, navigation}){

    const value = route.params;
    navigation.navigate('Dashboard')


    const init = async()=>{
        try{
            console.log("Stack initialized and searching for token");
            const jsonValue = await AsyncStorage.getItem('user');
            //await AsyncStorage.clear()
            console.log(jsonValue)
            if(jsonValue != null){
                console.log("User found");
                value = jsonValue
                console.log("Passing to dashboard: ", jsonValue)
                navigation.navigate('Dashboard', jsonValue);
            }else{
                navigation.replace('Welcome')
            }
        }catch(e){
            console.log(e);
        }
    }
    init();
    console.log(value)

    return(
        <View>
            <Text>HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH</Text>
        </View>
    )
}


export default transit;