import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../components/Item';
import Navigator from '../routes/welcomeStack'


const SignIn = ({navigation}) => {
    return (
      <View style={styles.inner}>
        <Text>This is the Sign In page</Text>
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

export default SignIn;