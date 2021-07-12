import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Image, Text, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/routers';
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'


function Vac({navigation}){
    const [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })
    const[vaccs, addVaccs] = useState()
    const[show, setShow] = useState()

    let vaccList = []

    const handleVaccs = (data) =>{
        addVaccs(data)
        Show(true)
    }

    const Show = (bool) =>{
        setShow(bool)
        console.log("VACCS", vaccs)
    }


    async function fetching(){
        const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/vaccines', {
            method:'GET'
        })
        const final = await rawResponse.json()
        final.vaccines.map((item)=>{
            vaccList = [...vaccList, item]
        })
        console.log(vaccList)
        handleVaccs(vaccList)
    }

    useEffect( () =>{
        console.log("Calling")

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
                    <Text style={s.mainTitle}>Vaccines</Text>
                </View>
                
                <View style={s.divider}>
                    <Text></Text>
                </View>


                {/*Loop through vaccines and display them*/}
                <ScrollView style={s.infoContainer} contentContainerStyle={{alignItems:'center'},{justifyContent:'center'}}>
                {vaccs &&
                    vaccs.map((item)=>{
                        return(
                        <View style={s.infoCard}>
                            <Text style={s.pay}>Name: 
                                <Text style={s.payD}> {item.name}</Text>
                            </Text>
                            <Text style={s.pay}>Number of Dose(s): 
                                <Text style={s.payD}> {item.nDose}</Text>
                            </Text>
                            {item.nDose >1 &&
                                <Text style={s.pay}>Gap between Doses: 
                                <Text style={s.payD}> {item.gap_days}</Text>
                                </Text>
                            }
                            <Text style={s.pay}>More information:</Text>
                            <Text style={s.payD, s.info}>{item.information}</Text>
                        
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
        alignItems:'center',
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
        height:200,
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
    info:{
        fontSize:12,
        fontFamily:'Poppins_400Regular'
    },
    pad:{
        height:20,
        width:2
    }
    
})

export default Vac;