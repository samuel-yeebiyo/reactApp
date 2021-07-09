import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import {NavigationContainer, CommonActions, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../../components/Item';
import Navigator from '../../routes/welcomeStack'
import { block } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'



function adminPage({route, navigation}){
    let jsonParsed;
    if(typeof(route.params)== 'string'){
        jsonParsed = JSON.parse(route.params)
    }else{
        jsonParsed = route.params
    }
    console.log(typeof(jsonParsed))
    const {identity} = jsonParsed;
    {/* To output from params {JSON.stringify(username)} */}


    const signOut = async() => {
        try{
            console.log("Signing out!");
            await AsyncStorage.clear()

            navigation.replace('Welcome')
        }catch(e){
            console.log(e);
        }
    }

    useEffect( () =>{
        const backAction = () =>{
            if(route.name == "adminPage"){
                BackHandler.exitApp()
                return true;
            }else{
                return false;
            }
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction.bind(this));
        
        return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
    }, []);



    return (
      <View style={styles.main}>
        <View style={styles.dash}>
            <View style={styles.top}>
                <View>
                    <Text style={styles.welcome}>Welcome {JSON.parse(JSON.stringify(identity))}!</Text>
                    <Text style={styles.sub}>Administrator</Text>
                </View>

                <TouchableOpacity style={styles.pic} onPress={()=> signOut()}/>
            </View>
        </View>
        <View style={styles.board}>
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {/*add action on press*/}
                    <View style={styles.menu}>
                        <ScrollView style={styles.menuContainer} horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>navigation.navigate('addUser', jsonParsed)}>
                                    <Text style={styles.title}>Manage Users</Text>
                                    <Text style={styles.description}>Modify, add, or remove users from the database. Alert: data persistence removal will be a problem</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>navigation.push('addHospital', jsonParsed)}>
                                    <Text style={styles.title}>Manage Hospitals</Text>
                                    <Text style={styles.description}>Modify, add, or remove hospitals from the database. Beware of the schema connection between the doctors, hospitals, and availability</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menuCard} > 
                            <TouchableOpacity style={styles.imageContainer1}>
                                <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.text} onPress={()=>navigation.push('addDoctor', jsonParsed)}>
                                <Text style={styles.title}>Manage Doctors</Text>
                                <Text style={styles.description}>Modify, add, or remove docctors from the database. Beware of the schema connection between the doctors, hospitals, and availability</Text>
                            </TouchableOpacity>
                            </View>
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>navigation.navigate('addVaccine')}>
                                    <Text style={styles.title}>Manage vaccine information</Text>
                                    <Text style={styles.description}>Modify, add, or remove vaccines from the database. Review the possible relations between the vaccines and the other schemas present</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pad}></View>
                        </ScrollView>

                    </View>
                    <TouchableOpacity style={styles.card} > 
                        <View style={styles.imageContainer2}>
                            <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                        </View>
                        <View style={styles.cardText}>
                            <Text style={styles.title}>This is the Title</Text>
                            <Text style={styles.description}>This a long description for the different menu options that will be available for the user to choose from, hopefully the space will be enough</Text>
                        </View>
                    </TouchableOpacity>
                    
                    <View style={styles.pad}></View>
                </ScrollView>
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    //Main
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#fff',
        alignItems:'center',
    },

    //Bottom side
    dash:{
        width:'100%',
        height:'40%',
        paddingHorizontal:'7%',
        backgroundColor:'#A74B4B',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
    top:{
        marginTop:55,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    welcome:{
        color:'#fff',
        fontSize:25,
        fontWeight:'bold'
    },
    sub:{
        color:'#F6F3E9',
        fontSize:14
    },
    pic:{
        borderWidth:2,
        borderColor:'#FFF',
        borderStyle:'solid',
        width:40,
        height:40,
        borderRadius:60
    },

    //Main board containing all the cards
    board:{
        height:'84%',
        backgroundColor:'#FFF',
        width:'95%',
        borderTopLeftRadius:35,
        borderTopRightRadius:35,
        zIndex:2,
        position:'relative',
        bottom:'24%',
        justifyContent:'center',
        alignItems:'center',
    },

    //top containers
    wrapper:{
        borderTopLeftRadius:35, 
        borderTopRightRadius:35,
        width:'100%',
        height:'100%', 
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
    },
    container:{
        width:'100%',
        paddingHorizontal:'0%',
        height:'100%',
        paddingTop:20,
        flexDirection:'column',
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        overflow:'visible',
    },

    //vaccine status
    status:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10,
        marginBottom:20,
        marginHorizontal:'5%',
    },

    //horizontal scroll cards
    menu:{
        backgroundColor:'#fff',
        width:'100%',
        height:300,
        position:'relative',
        //right:10,
        marginBottom:25,
        borderRadius:40 ,
    },
    menuContainer:{
        height:'100%',
        width:'100%'  
    },
    menuCard:{
        position:'relative',
        width:260,
        backgroundColor:'#fff',
        borderRadius:35,
        marginLeft:15,
    },
    imageContainer1:{
        width:'100%',
        height:'85%',
        overflow:'hidden',
        borderRadius:35,
    },
    text:{
        backgroundColor:"#FFF",
        height:'30%',
        width:'99%',
        position:'absolute',
        bottom:10,
        left:10,
        borderRadius:20,
        shadowColor:"#000",
        shadowOffset:{width:0, height:4},
        shadowOpacity:0,
        shadowRadius:4,
        elevation:4
    },
    
    description:{
        marginHorizontal:12,
        fontSize:11
    },

    //vertical scroll cards
    card:{
        backgroundColor:'#F6F3E9',
        borderRadius:35,
        height:150,
        marginBottom:25,
        flexDirection:'row',
        overflow:'hidden',
        marginHorizontal:'5%',
    },
    imageContainer2:{
        width:'40%',
        height:'100%',
        overflow:'hidden',
    },
    cardText:{
        width:'60%'
    },
    
    //main image and text styling
    image:{
        backgroundColor:"#000",
        height:'100%',
        width:'100%',
    },
    title:{
        fontWeight:'bold',
        marginHorizontal:12,
        marginTop:10,
        marginBottom:5,
        fontSize:17
    },


    
    pad:{
        height:15,
        width:15
    }
    
    
})

export default adminPage;