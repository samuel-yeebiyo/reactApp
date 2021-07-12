import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, ImageBackground, Text, TextInput, TouchableOpacity, View, BackHandler, Alert} from 'react-native';
import {CommonActions, NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../../components/Item';
import Navigator from '../../routes/welcomeStack'
import {useForm, Controller }from 'react-hook-form'
import Input from '../../components/Input'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { onChange, Value } from 'react-native-reanimated';

const SignIn = ({route, navigation}) => {

    const[user, setUser]=useState({})

    const {control, handleSubmit, formState:{errors}} = useForm();

    const constructor = () =>{
        console.log("Passed Sign in")
    }
    constructor()

    const persist = async(data) =>{
        try{
            await AsyncStorage.setItem('user', data);
            console.log("User has been cached")
        }catch(errs){
            console.log(errs)
        }
    }

    const onSubmit = async (data)=>{
        console.log(data)
        const rawResponse = await fetch('http://192.168.10.159:3000/users/login',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                id:data.id,
                password:data.password
            })
            
        }).then(response => response.json())
        .then(final=>{
            console.log("response returned")
            const permission = final.allow;
            const userReturned = final.payload;

            console.log("Permission:", permission);
            
            const jsonString = JSON.stringify(userReturned)
            console.log("Returned User:", jsonString)
            

            persist(jsonString)

            if(permission == true && userReturned.auth == "BASIC"){
                console.log("Allowed")
                console.log("Popping")
                navigation.replace("app", {screen:"Dashboard", params: userReturned})
            }else if(permission == true && userReturned.auth == "ADMIN"){
                console.log("Admin logging in ...")
                navigation.replace("admin", {screen:"adminPage", params:userReturned})
            }
        })
    }

    return (
        <View style={styles.main}>
        <View style={styles.hero}>
            <Text style={styles.bigText}>COVID-19 Vaccination Information System</Text>
            <View style={styles.form}>
                <Controller
                    control={control}
                    render={({field:{onChange,value}})=>(
                        <Input error={errors.id} errorText={errors.id?.message} style={styles.input} placeholder={"Username/Passport"} onChangeText={value=>onChange(value)} value={value}/>
                    )}
                    name="id"
                    rules={{
                        required:{
                            value:true,
                            message:"Username or Passport required"
                        }
                    }}
                />
                
                <Controller
                control={control}
                    render={({field:{onChange,value}})=>(
                        <Input secureTextEntry={true} error={errors.password} errorText={errors.password?.message} style={styles.input} placeholder={"Password"} onChangeText={value=>onChange(value)} value={value}/>
                    )}
                    name="password"
                    rules={{
                        required:{
                            value:true,
                            message:"Please provide a password"
                        }
                    }}
                />                
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
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}> 
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
        backgroundColor:'#01a1f8',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center',
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
        marginTop:25,
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
