import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../components/Item';
import Navigator from '../routes/welcomeStack'


const Register = ({navigation}) => {
    return (
      <View style={styles.inner}>
        <Text>This is the Register Page</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    inner:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFF',
        paddingTop:50,
        paddingLeft:20
    }
})

export default Register;