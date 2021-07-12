import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/routers';
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'



function Hos({navigation}){
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })
    const[hospitals, addH] = useState()
    const[show, setShow] = useState()

    let hosList = []

    const handleHos = (data) =>{
        addH(data)
        Show(true)
    }

    const Show = (bool) =>{
        setShow(bool)
        console.log("HOSS", vaccs)
    }

    async function fetching(){
        const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/hospitals', {
            method:'GET'
        })
        const final = await rawResponse.json()
        final.hospitals.map((item)=>{
            hosList = [...hosList, item]
        })
        console.log(hosList)
        handleHos(hosList)
    }

    useEffect( () =>{
        console.log("called")
        

        fetching()
        const backAction = () =>{
            navigation.dispatch(StackActions.pop(1))
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()
    }, []);

    return (
        <View style={s.main}>
            <View style={s.container}>
            <View style={s.topSide}>
            <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.pop(1))}>
                <Image style={s.back} source={require('../../assets/back-arrow.png')}/>
                </TouchableOpacity>
                <Text style={s.mainTitle}>Hospitals</Text>
            </View>
                
                <View style={s.divider}>
                    <Text></Text>
                </View>


                {/*Loop through vaccines and display them*/}
                <ScrollView style={s.infoContainer} contentContainerStyle={{alignItems:'center'},{justifyContent:'center'}}>
                {hospitals &&
                    hospitals.map((item)=>{
                        return(
                        <View style={s.infoCard}>
                            <Text style={s.pay}>Name: 
                                <Text style={s.payD}> {item.name}</Text>
                            </Text>
                            <Text style={s.pay}>Location: 
                                <Text style={s.payD}> {item.location}</Text>
                            </Text>
                        </View>
                        )
                    })                    
                }          
                    <View style={s.pad}>
                    
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

const s = StyleSheet.create({
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#21264b',
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
        fontSize:45,
        color:"#FFF"        
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
        height:'85%',
        width:'100%',
    },
    infoCard:{
        height:100,
        width:'90%',
        backgroundColor:"#01a1f8",
        alignSelf:'center',
        marginTop:20,
        borderRadius:10,
        padding:15
    },
    pay:{
        fontWeight:'bold',
        fontFamily:'Poppins_400Regular'
    },
    payD:{
        fontWeight:'normal',
        fontFamily:'Poppins_400Regular'
    },
    pad:{
        height:20,
        width:2
    }
    
})

export default Hos;