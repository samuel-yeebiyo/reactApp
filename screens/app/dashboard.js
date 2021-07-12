import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler, Alert } from 'react-native';
import {NavigationContainer, CommonActions, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../../components/Item';
import Navigator from '../../routes/welcomeStack'
import { block } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'



function Dashboard({route, navigation}){
    const [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })

    let jsonParsed;
    if(typeof(route.params)== 'string'){
        jsonParsed = JSON.parse(route.params)
    }else{
        jsonParsed = route.params
    }
    const {identity, passport} = jsonParsed;
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

    const outAlert = () =>{
        Alert.alert(
            "Sign Out",
            "Are you sure you wanna sign out?",
            [
                {
                    text:"Cancel",
                    style:'cancel'
                },
                {
                    text:"Yes, Sign Out",
                    onPress: ()=>{signOut()}
                }
            ]
        )
    }

    const [status, setStatus] = useState({})
    const [show,setShow] = useState(false)
    const imageURI = {uri: `http://192.168.10.159:3000/image/${passport}.png`}

    const fetching = async()=>{ 
        console.log("CALLED")
        await fetch('http://192.168.10.159:3000/healthcare/user/status',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                passport:passport
            })
        }).then(response=> response.json())
        .then((data)=>{
            handleStatus(data)
        })
        
        
    }


    function handleStatus(data){
        setStatus(data);
        setShow(true)

    }

    useEffect( () =>{

        fetching()

        const backAction = () =>{
            if(route.params.identity == ""){
                navigation.navigate('Welcome')
            }else{
                BackHandler.exitApp()
            }
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()

    }, []);



    return (
      <View style={styles.main}>
        <View style={styles.dash}>
            <View style={styles.top}>
                <View>
                    <Text style={styles.welcome}>Welcome {JSON.parse(JSON.stringify(identity))}!</Text>
                    {!!identity ?
                        <Text style={styles.sub}>{JSON.parse(JSON.stringify(passport))}</Text>
                        :
                        <Text style={styles.sub}>Not Signed In</Text>
                    }
                </View>

                {!!identity ?
                    <TouchableOpacity style={styles.pic} onPress={outAlert}>
                        <Image style={{height:50, width:50}} source={imageURI} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={()=>{navigation.navigate("Sign In")}}>
                        <Text style={styles.sub}>Sign In</Text>
                    </TouchableOpacity>
                }
            </View>
        </View>
        <View style={styles.board}>
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {/*add action on press*/}
                    <View style={styles.menu}>
                        <ScrollView style={styles.menuContainer} horizontal showsHorizontalScrollIndicator={false}>
                        {!show && !!identity &&
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>{navigation.navigate("Booking", jsonParsed)}}>
                                    <Text style={styles.title}>Book Vaccination</Text>
                                    <Text style={styles.description}>Please pick the nearest location, and tell us the suitable time and date so we can recommend a doctor for you. You can also pick which vaccine you're comfortable with.</Text>
                                </TouchableOpacity>
                            </View>
                        }
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>{navigation.navigate("vacInfo", jsonParsed)}}>
                                    <Text style={styles.title}>View Vaccine Information</Text>
                                    <Text style={styles.description}>Learn more about the available vaccines and figure out which one is best for you and your family. According to global health guidelines, the best vaccine is the one that is available to you the soonest.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menuCard} > 
                                <TouchableOpacity style={styles.imageContainer1}>
                                    <Image style={styles.image} source={require('../../assets/trial.jpg')}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.text} onPress={()=>{navigation.navigate("hosInfo", jsonParsed)}}>
                                    <Text style={styles.title}>View Hospital Information</Text>
                                    <Text style={styles.description}>Find out where you are able to book vaccine appointments with us (this application). Currently all the hospitals we are partnered with have all the same vaccines available.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.pad}></View>
                        </ScrollView>

                    </View>

                    <View>
                    {show ? 
                        <View style={styles.center}>
                            <Text>Upcoming vaccine appointments</Text>
                            <Text>Be sure to be on time and follow basic safety guidelines</Text>
                        </View>
                        :
                        identity ? 
                        <View  style={styles.naw}>
                        <Text style={styles.text1}>No appointments scheduled, book an appointment.</Text>
                            <Image style={styles.empty} source={require('../../assets/empty.png')}/>
                        </View>
                        :
                        <View  style={styles.not}>
                            <Text style={styles.text1}>Sign in to be able to book appointments and get vaccinated!</Text>
                            <Image style={styles.signin} source={require('../../assets/signin.png')}/>

                        </View>

                    }
                    </View>

                    <View>
                        {show && 
                            status.booking_information.map((item)=>(
                                <>
                                <View style={styles.card}>
                                    <Text style={styles.pay}>Passport: 
                                        <Text style={styles.payD}> {item.passport}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Date:
                                        <Text style={styles.payD}> {item.date.day} - {item.date.formal}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Hospital:
                                        <Text style={styles.payD}> {item.hospital.name}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Location:
                                        <Text style={styles.payD}> {item.hospital.location}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Doctor:
                                        <Text style={styles.payD}> {item.doctor.name}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Availability:
                                        <Text style={styles.payD}> {item.doctor.availability[0].time[0].from} - {item.doctor.availability[0].time[0].to}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Vaccine:
                                        <Text style={styles.payD}> {item.vaccine.name}</Text>
                                    </Text>
                                    <Text style={styles.pay}>Dose:
                                        <Text style={styles.payD}> {item.doseNumber}</Text>
                                    </Text>
                                </View>
                                </>
                            ))
                        }
                    </View>

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
    card:{
        backgroundColor:'#27eda0',
        borderRadius:10,
        height:180,
        justifyContent:'center',
        marginBottom:25,
        flexDirection:'column',
        marginHorizontal:'5%',
        padding:15
    },
    pay:{
        fontWeight:'bold',
        fontFamily:'Poppins_400Regular',
        color:'#000'
    },
    payD:{
        fontWeight:'normal',
        fontFamily:'Poppins_400Regular'
    },

    //Bottom side
    dash:{
        width:'100%',
        height:'40%',
        paddingHorizontal:'7%',
        backgroundColor:'#21264B',
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
        width:55,
        height:55,
        borderRadius:60,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
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
        paddingTop:17,
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

    center:{
        alignSelf:'center',
        alignItems:'center',
        marginBottom:20
    },
    

    not:{
        width:'90%',
        height:200,
        alignItems:'center',
        alignSelf:'center'
    },
    text1:{
        fontFamily:'Poppins_400Regular',
        fontSize:12
    },
    signin:{
        height:100,
        width:100,
        marginTop:70,
        alignSelf:'center'
    },

    naw:{
        width:'90%',
        height:200,
        alignItems:'center',
        alignSelf:'center'
    },
    empty:{
        height:100,
        width:100,
        marginTop:70,
        alignSelf:'center'
    },

    
    pad:{
        height:15,
        width:15
    }
    
    
})

export default Dashboard;