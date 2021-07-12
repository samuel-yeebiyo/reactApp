import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import {NavigationContainer, CommonActions, StackActions} from '@react-navigation/native'
import { Formik, Form, Field, useFormik } from 'formik';
import PickHospital from '../../components/PickHospital'
import PickDate from '../../components/DatePicker'
import VaccinePicker from '../../components/PickVaccine'
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'



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
        <View style={styles.board}>

        <View style={styles.topSide}>
        <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.pop(1))}>
            <Image style={styles.back} source={require('../../assets/back-arrow.png')}/>
            </TouchableOpacity>
            <View style={styles.titles}><Text style={styles.mainTitle}>Book An</Text>
            <Text style={styles.mainTitle}>Appointment</Text></View>
        </View>

            <View style={styles.divider}>
                <Text ></Text>
            </View>


            <View style={styles.wrapper}>
                <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{alignItems:'center'}, {justifyContent:'center'}}>
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
                            navigation.replace("Dashboard")
                        }}>

                        {({ handleChange, handleSubmit, values }) => (
                            <View style={styles.form}>
                                <PickHospital style={styles.ph}get={getHospital}/>
                                <View style={styles.pad}></View>
                                <PickDate get={getData}/>
                                <View style={styles.pad}></View>
                                <VaccinePicker get={getVaccine}/>
                                <View style={styles.pad}></View>

                                <View style={styles.rest}>
                                    <TouchableOpacity style={styles.find} onPress={() => {
                                        fetching()
                                        showing(true)
                                    }}>
                                        <Text>Find Doctors</Text>
                                    </TouchableOpacity>

                                    <View>
                                    {show && 
                                        doctor.map((item)=>(
                                            <TouchableOpacity style={choice.name==item.name ? styles.foc :  styles.list}onPress={()=>{
                                                choose(item)
                                            }}>
                                                <Text>Doctor: {item.name}</Text>
                                            </TouchableOpacity>
                                        ))
                                    }
                                    </View>
                                    
                                    <TouchableOpacity style={styles.submit} onPress={handleSubmit} title="Submit">
                                        <Text>Submit</Text>
                                    </TouchableOpacity>
                                </View>
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
    //Main
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#FFF',
        alignItems:'center',
    },

    //Main board containing all the cards
    board:{
        height:'100%',
        width:'95%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:50
    },
    mainTitle:{
        fontFamily:'Poppins_700Bold',
        fontStyle:'normal',
        fontSize:32,
        marginBottom:-10,
        color:"#000"        
    },
    titles:{
        flexDirection:'column'
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

    //top containers
    wrapper:{
        borderTopLeftRadius:35, 
        borderTopRightRadius:35,
        width:'100%',
        height:'90%', 
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center',
        position:'relative'
    },
    container:{
        width:'100%',
        paddingHorizontal:'0%',
        paddingTop:20,
        flexDirection:'column',
        borderTopLeftRadius:60,
        borderTopRightRadius:60,
        overflow:'visible',
    },
    wrapForm:{
        width:'100%',
        alignItems:'center',
        paddingTop:20,
        borderColor:'#000',
        borderStyle:'solid',
        borderWidth:1,
    },
    form:{
        width:'100%',
        height:'95%',
    },
    pad:{
        height:10,
        width:10
    },
    rest:{
        alignItems:'center',
        height:'100%',
    },
    find:{
        width:120,
        alignItems:'center',
        height:35,
        backgroundColor:'#CCC',
        justifyContent:'center'

    },
    list:{
        width:240,
        marginTop:20,
        height:40,
        padding:10,
        borderRadius:5,
        borderColor:'#000',
        borderStyle:'solid',
        borderWidth:1
    },
    foc:{
        width:240,
        marginTop:20,
        height:40,
        padding:10,
        borderRadius:5,
        borderColor:'#27eda0',
        borderStyle:'solid',
        borderWidth:1

    },
    submit:{
        marginTop:30,
        width:120,
        height:35,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#CCC'
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