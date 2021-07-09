import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import {NavigationContainer, CommonActions, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from '../../components/Item';
import Navigator from '../../routes/welcomeStack'
import { block } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Formik, Form, Field, useFormik } from 'formik';
import PickHospital from '../../components/PickHospital'
import PickDate from '../../components/DatePicker'
import VaccinePicker from '../../components/PickVaccine'



function Booking({route, navigation}){

    let jsonParsed;
    if(typeof(route.params)== 'string'){
        jsonParsed = JSON.parse(route.params)
    }else{
        jsonParsed = route.params
    }
    const {identity, passport} = jsonParsed;
    {/* To output from params {JSON.stringify(username)} */}

    const[hospital, setHospital] = useState()
    const[choice, setChoice] = useState({})
    const[date, setDate] = useState()
    const[vaccine, setVaccine] = useState({})
    const[doctor, setDoctor] = useState([])


    const[show,setShow]=useState(false)

    function showing(bool){
        setShow(bool)
    }

    let doctorList = []

    const handleDoc = (data) => {
        setDoctor(data)
    }

    const choose = (data)=>{
        setChoice(data)
    }

    useEffect( () =>{
        const backAction = () =>{
            //Think of ways to handle unsaved changes
            navigation.dispatch(StackActions.pop())
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()
    }, []);


    function getHospital(val){
        setHospital(val)
        console.log("Got hospital:", val)
    }

    function getData(val){
        setDate(val)
        console.log("Got date:", val)
    }
    function getVaccine(val){
        setVaccine(val)
        console.log("Got vaccine:", val)
    }

    


    async function fetching(){
        const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/profess', {
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                hospital:hospital.name,
                date:date.day,
            })
        })

        const final = await rawResponse.json()
        final.docs.map((items)=>{
            doctorList = [...doctorList, items]
        })
        console.log("List of found doctors: ", doctorList)
        handleDoc(doctorList)
    }



    return (
      <View style={styles.main}>
        <View style={styles.dash}>
            <View style={styles.top}>
                <View>
                    <Text style={styles.welcome}>Welcome {JSON.parse(JSON.stringify(identity))}!</Text>
                    <Text style={styles.sub}>{JSON.parse(JSON.stringify(passport))}</Text>
                </View>

                <TouchableOpacity style={styles.pic}/>
            </View>
        </View>
        <View style={styles.board}>
            <View style={styles.wrapper}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                    {/*add action on press*/}
                
                    <Formik
                        initialValues={{
                            name: '',
                            location:''
                        }}
                        onSubmit={async (values) => {
                            const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/book',{
                                method:'POST',
                                headers:{
                                    'Accept':'application/json',
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({
                                    passport:passport,
                                    date:date,
                                    hospital:hospital,
                                    doctor:choice,
                                    vaccine:vaccine,
                                })
                            })
                        }}>

                        {({ handleChange, handleSubmit, values }) => (
                            <View style={styles.form}>
                                <PickHospital get={getHospital}/>
                                <PickDate get={getData}/>
                                <VaccinePicker get={getVaccine}/>
                                
                                <TouchableOpacity onPress={() => {
                                    fetching()
                                    showing(true)
                                }}>
                                    <Text>Find Doctors</Text>
                                </TouchableOpacity>

                                <View>
                                {show && 
                                    doctor.map((item)=>(
                                        <TouchableOpacity onPress={()=>{
                                            choose(item)
                                            //change styling
                                        }}>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                                </View>
                                
                                <TouchableOpacity onPress={handleSubmit} title="Submit">
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                    
                    <View style={styles.pad}></View>
                </ScrollView>
            </View>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    //form
    form:{
        position:'relative',
        left:120
    },

    view:{
        height:100,
        width:300,
        backgroundColor:'#EEE'
    },

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

export default Booking;