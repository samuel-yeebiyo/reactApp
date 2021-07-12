import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/routers';
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'

import Formdoc from '../../../components/DoctorsForm'


function addingDoctors({route, navigation}){
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })

    //Displays the admin ID
    let jsonParsed;
    if(typeof(route.params)== 'string'){
        jsonParsed = JSON.parse(route.params)
    }else{
        jsonParsed = route.params
    }
    console.log(typeof(jsonParsed))
    const {identity} = jsonParsed;
    {/* To output from params {JSON.stringify(username)} */}


    function get(){
        navigation.dispatch(StackActions.pop(1))
    }

    
    //prevent the back button from going to home page
    useEffect( () =>{
        const backAction = () =>{
            navigation.dispatch(StackActions.pop(1))
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()
    }, []);

    
    
    return (
        <View style={styles.main}>
            <View style={styles.container}>
            <View style={styles.topSide}>
            <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.pop(1))}>
                <Image style={styles.back} source={require('../../../assets/back-arrow.png')}/>
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Add Doctor</Text>
            </View>
                    
                    <View style={styles.divider}>
                        <Text></Text>
                </View>   
                <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
                    {/*add action on press*/}
                    <Formdoc nav={get}/>
                    <View style={styles.pad}></View>
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#CCC',
        paddingTop:40,
        alignItems:'center'
    },
    container:{
        height:'100%',
        width:'95%',
        alignItems:'center'
    },
    mainTitle:{
        fontFamily:'Poppins_700Bold',
        fontStyle:'normal',
        fontSize:45        
    },
    back:{
        height:35,
        width:40,
        marginRight:20,
        marginLeft:10
    },
    topSide:{
        height:'15%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'flex-start'
    },
    divider:{
        width:'90%',
        height:4,
        borderRadius:10,
        backgroundColor:'#27eda0'
    },
    infoContainer:{
        height:'0%',
        width:'100%',
        backgroundColor:"#FFF"
    },
    infoCard:{
        height:200,
        width:'90%',
        backgroundColor:"#CCC",
        alignSelf:'center',
        marginTop:20
    },
    pad:{
        height:20,
        width:2
    }
    
})
export default addingDoctors;