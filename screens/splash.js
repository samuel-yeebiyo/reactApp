import React, {useState} from 'react';
import { StyleSheet, Image, Text, View, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

function splashScreen({navigation}){
    console.log("Appeared First")
    let value;
    const init = async()=>{
        try{
            const jsonValue = await AsyncStorage.getItem('user');
            console.log(jsonValue)
            if(jsonValue != null){
                console.log("User found");
                value = JSON.parse(jsonValue)
                console.log("Passing to dashboard: ", typeof(value), value)
                if(value.auth == "BASIC"){
                    setTimeout(()=>{
                        navigation.replace("app", {screen:"Dashboard", params: value});
                    }, 1000)
                }else if(value.auth == "ADMIN"){
                    setTimeout(()=>{
                        navigation.replace("admin", {screen:"adminPage", params: value});
                    }, 1000)
                }
            }else{
                setTimeout(()=>{
                    navigation.replace('Welcome')
                }, 1000)
            }
        }catch(e){
            console.log(e);
        }
    }
    init();
   //source={require('../assets/back.png')}
    return(
        <View style={styles.whole}>
            <ImageBackground style={styles.image}>
            <View style={styles.imageContainer}>
                <Image style={styles.logo} source={require('../assets/splashLogo.png')}/>
            </View>
            </ImageBackground>
        </View>
    )


    
}
const styles = StyleSheet.create({
    whole:{
        width:'100%',
        height:'100%',
        backgroundColor:'#F95A64',
    },
    image:{
        //flex:1,
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        resizeMode:'contain'
    },
    imageContainer:{
        width:'60%',
        height:undefined
    },
    logo:{
        width:'100%',
        height:'100%',
        resizeMode:'contain'
    },

})


export default splashScreen;