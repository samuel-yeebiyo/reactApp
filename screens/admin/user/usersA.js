import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/routers';
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'



function Users({navigation}){
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })

    const[users, addUsers]= useState([])
    const[stat, addStats]= useState([])
    const[show, setShow]=useState()

    let userList = []
    let statList = []

    const handleUsers = (data) =>{
        addUsers(data)
        Show(true)
    }
    const Show = (bool) =>{
        setShow(bool)
        console.log("STATS", stat)
    }
    const handleStats = (data) =>{
        addStats(data)
        Show(true)
    }

    async function fetching(){
        const rawResponse = await fetch('http://192.168.10.159:3000/users/all', {
            method:'GET'
        })
        const final = await rawResponse.json()
        final.users.map((item)=>{
            userList = [...userList, item]
        })
        console.log(userList)
        handleUsers(userList)
    }

    async function fetching2(){
        const stat = await fetch('http://192.168.10.159:3000/healthcare/user/status/all',{
            method:'GET'
        })

        const status = await stat.json()
        status.status.map((item)=>{
            let statling = {
                passport:item.passport,
                vaccinated:item.vaccinated
            }
            statList = [...statList, statling]
        })
        console.log(statList)
        handleStats(statList)
    }

    useEffect( () =>{
        console.log("called")

        fetching()
        fetching2()
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
                <Image style={s.back} source={require('../../../assets/back-arrow.png')}/>
                </TouchableOpacity>
                <View style={s.titles}><Text style={s.mainTitle}>Registered</Text>
                <Text style={s.mainTitle}>Users</Text></View>
                
            </View>
                
                <View style={s.divider}>
                    <Text></Text>
                </View>


                {/*Loop through vaccines and display them*/}
                <ScrollView style={s.infoContainer} contentContainerStyle={{alignItems:'center'},{justifyContent:'center'}}>
                {users &&
                    users.map((item)=>{
                        const pass = item.passport
                        const UI = 'http://192.168.10.159:3000/image/'+pass+'.png'
                        console.log(UI)
                        const URI = {uri: UI}
                        let found;
                        return(
                        <View style={s.infoCard}>
                            <Image  style={s.profile} source={{uri: UI}}/>
                            <View style={s.other}>
                                <Text style={s.pay}>Name:
                                    <Text style={s.payD}> {item.name}</Text>
                                </Text>
                                <Text style={s.pay}>Passport:
                                    <Text style={s.payD}> {item.passport}</Text>
                                </Text>
                                <Text style={s.pay}>Date Joined:
                                <Text style={s.payD}> {item.date}</Text>
                                </Text>
                                {stat && 
                                    stat.map((item2) =>{
                                        if(item2.passport == item.passport){
                                            found = true;
                                            return(
                                            <Text style={s.pay} >Vaccinated:
                                                <Text style={s.payD}> {item2.vaccinated}</Text>
                                            </Text>
                                            );
                                        }
                                    })
                                }
                            </View>
                        
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
        fontSize:32,
        marginBottom:-10        
    },
    titles:{
        flexDirection:'column'
    },
    profile:{
        width:70,
        height:70,
        borderRadius:5,
        marginRight:15
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
        backgroundColor:'#000'
    },
    infoContainer:{
        height:'85%',
        width:'100%',
        backgroundColor:"#FFF"
    },
    infoCard:{
        height:200,
        width:'90%',
        backgroundColor:"#CCC",
        alignSelf:'center',
        marginTop:20,
        borderRadius:10,
        padding:15,
        flexDirection:'row',
        alignItems:'center'
    },
    other:{
        width:220
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

export default Users;