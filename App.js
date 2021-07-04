import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from './components/Item';
import Navigator from './routes/welcomeStack'
import HomeScreen from './screens/home'



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
    //flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color:'#000',
    fontSize:24,
    fontWeight:'bold'
  },
  text: {
    color:'#000'
  },
  write:{
    position:'absolute',
    bottom:30,
    flexDirection:'row',
    width:'99%',
    justifyContent:'space-between'
  },
  input:{
    backgroundColor:'#E4E4E4',
    width:'70%',
    height:40,
    paddingHorizontal:15,
    borderRadius:20
  },
  adding:{
    width:40,
    height:40,
    borderRadius:60,
    backgroundColor:'#E4E4E4',
    justifyContent:'center',
    alignItems:'center'
  },
  addText:{},

});
