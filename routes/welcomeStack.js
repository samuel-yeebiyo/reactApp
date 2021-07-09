import React from 'react'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {useState} from 'react';
import {createAppContainer, createSwitchNavigator} from '@react-navigation/native'
import {enableScreens} from 'react-native-screens'
import AsyncStorage from '@react-native-async-storage/async-storage'

//Screens
import splashScreen from '../screens/splash'

//auth
import Home from '../screens/auth/home'
import In from '../screens/auth/signin'
import Register from '../screens/auth/register'

//app
import Dashboard from '../screens/app/dashboard'
import Booking from '../screens/app/booking'

//admin
import AdminPage from '../screens/admin/adminPage'
    //users
import Users from '../screens/admin/user/usersA'
import  rUsers from '../screens/admin/user/usersD'
    //hospitals
import Hospital from '../screens/admin/healthcare/healthcareA'
import rHospital from '../screens/admin/healthcare/healthcareD'
    //doctors
import Doctors from '../screens/admin/healthcare/doctorA'
import rDoctors from '../screens/admin/healthcare/doctorD'
    //vaccine
import Vaccine from '../screens/admin/vaccine/vaccineA'
import rVaccine from '../screens/admin/vaccine/vaccineD'
    //notice



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
            <Stack.Screen name="Booking" component={Booking}/>
            <Stack.Screen name="auth" component={authScreen}/>
        </Stack.Navigator>
    )
}

const adminStack = () =>{
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="adminPage" initialParams={value} component={AdminPage}/>
            
            <Stack.Screen name="rUser" component={rUsers}/>
            <Stack.Screen name="rHospital" component={rHospital}/>
            <Stack.Screen name="rDoctor" component={rDoctors}/>
            <Stack.Screen name="rVaccine" component={rVaccine}/>
            
            <Stack.Screen name="addUser" component={Users}/>
            <Stack.Screen name="addHospital" component={Hospital}/>
            <Stack.Screen name="addDoctor" component={Doctors}/>
            <Stack.Screen name="addVaccine" component={Vaccine}/>
            
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