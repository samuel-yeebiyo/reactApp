import React from 'react'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useState} from 'react';
import {createAppContainer, createSwitchNavigator} from '@react-navigation/native'
import {enableScreens} from 'react-native-screens'

import Home from '../screens/home'
import In from '../screens/signin'
import Register from '../screens/register'
import Dashboard from '../screens/dashboard'
import splashScreen from '../screens/splash'
import AdminPage from '../screens/adminPage'
import { initialWindowMetrics } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'


enableScreens();
const Stack = createStackNavigator();
const authScreen = () =>{
    return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="loading" component={splashScreen}/>
        <Stack.Screen name="Welcome" component={Home}/>
        <Stack.Screen name="Sign In" component={In}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="app" component={appScreen}/>
        <Stack.Screen name="admin" component={adminStack}/>
    </Stack.Navigator>
    )
}


const appScreen = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Dashboard" initialParams={value} component={Dashboard}/>
            <Stack.Screen name="auth" component={authScreen}/>
        </Stack.Navigator>
    )
}

const adminStack = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="adminPage" initialParams={value} component={AdminPage}/>
            <Stack.Screen name="auth" component={authScreen}/>
        </Stack.Navigator>
    )
}

let value;

function MyStack(){
    return(
        <Stack.Navigator initialRouteName={"auth", {screen:'splashScreen'}} screenOptions={{headerShown: false}}>
            <Stack.Screen name="auth" component={authScreen}/>
            <Stack.Screen name="app" initialParams={value} component={appScreen}/>
        </Stack.Navigator>
    )
}

export default MyStack;