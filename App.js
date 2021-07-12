import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Navigator from './routes/welcomeStack'



const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

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
