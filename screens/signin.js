import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../components/Item';
import Navigator from '../routes/welcomeStack'
import {useForm }from 'react-hook-form'

const SignIn = ({navigation}) => {
    return (
        <View style={styles.main}>
        <View style={styles.hero}>
            <Text style={styles.bigText}>COVID-19 Vaccination Information System</Text>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder={"Username"}></TextInput>
                <TextInput style={styles.input} placeholder={"Password/Passport Number"}></TextInput>
            </View>
        </View>
        <View style={styles.buttons}>
            <View style={styles.line}>
                <Text style={styles.append}>Don't have an account? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
                    <Text style={styles.sign}>Register</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.access}>
            {/*This should check input form and then navigate*/}
                <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Sign In')}> 
                    <Text style = {styles.buText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#A74B4B',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center'
    },
    hero:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:'10%'
    },
    bigText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#FFF"
    },
    form:{
        marginTop:90,
        width:'100%',
    },
    input:{
        backgroundColor:'#FFF',
        height:50,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginBottom:25,
        borderRadius:8
    },
    buttons:{
        position:'absolute',
        bottom:60,
        width:'100%',
    },
    line:{
        flexDirection:'row',
        alignSelf:'center'
    },
    append:{
        fontSize:16,
        color:'#FFF'
    },
    sign:{
        textAlign:'center',
        height:20,
        color:"#FFF",
        textDecorationLine:'underline',
        fontWeight:'bold',
        fontSize:16,
    },
    access:{
        flexDirection:'row',
        marginTop:30,
        height:70,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        height:60,
        width:120,
        backgroundColor:'#000',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
    },
    buText:{
        textAlign:'center',
        color:'#FFF'
        
    }
})

export default SignIn;
