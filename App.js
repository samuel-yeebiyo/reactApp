import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from './components/Item';
import Navigator from './routes/welcomeStack'
import HomeScreen from './screens/auth/home'



const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    width:'100%',
    height:'100%',
    backgroundColor:'#000',
    paddingTop:0,
    marginLeft:0,
  }
});
