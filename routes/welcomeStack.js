import React from 'react'
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createAppContainer} from '@react-navigation/native'
import {enableScreens} from 'react-native-screens'

import Home from '../screens/home'
import In from '../screens/signin'
import Register from '../screens/register'

enableScreens();
const Stack = createStackNavigator();

function MyStack(){
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Welcome" component={Home}/>
            <Stack.Screen name="Sign In" component={In}/>
            <Stack.Screen name="Register" component={Register}/>
        </Stack.Navigator>
    )
}

export default MyStack;