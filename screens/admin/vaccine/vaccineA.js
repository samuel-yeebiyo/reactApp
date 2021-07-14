import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Alert, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { Formik, Form, Field, useFormik } from 'formik';
import { StackActions } from '@react-navigation/routers';
import {useFonts, Poppins_400Regular, Poppins_700Bold} from '@expo-google-fonts/poppins'


function Vaccines({navigation}){
    let [fonts] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
    })
    useEffect( () =>{
        const backAction = () =>{
            navigation.dispatch(StackActions.pop(1))
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()
    }, []);


    function navi(){
        Alert.alert(
            "Success",
            "Added vaccine successfully",
            [
                {
                    text:"Okay",
                    onPress: ()=>{navigation.dispatch(StackActions.pop(1))}
                }
            ]
        )
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
            <View style={styles.topSide}>
            <TouchableOpacity onPress={()=>navigation.dispatch(StackActions.pop(1))}>
                <Image style={styles.back} source={require('../../../assets/back-arrow.png')}/>
                </TouchableOpacity>
                <Text style={styles.mainTitle}>Add Vaccine</Text>
            </View>
                
                <View style={styles.divider}>
                    <Text></Text>
                </View>
        
                <ScrollView style={styles.infoContainer} showsVerticalScrollIndicator={false}>
                {/*add action on press*/}
                    <Formik
                        initialValues={{
                            name: '',
                            nDose:1,
                            gap_days:0,
                            information:''
                        }}
                        onSubmit={async (values) => {
                            const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/vaccine/add',{
                                method:'POST',
                                headers:{
                                    'Accept':'application/json',
                                    'Content-Type':'application/json'
                                },
                                body: JSON.stringify({
                                    name:values.name,
                                    nDose:values.nDose,
                                    gap_days:values.gap_days,
                                    information:values.information
                                })
                            })

                            navi()
                        }}>

                        {({ handleChange, handleSubmit, values }) => (
                            <View style={styles.form}>
                                <TextInput
                                    onChangeText={handleChange('name')}
                                    placeholder="Vaccine Name"
                                    value={values.name}
                                    style={styles.name}
                                />
                                <TextInput
                                    onChangeText={handleChange('nDose')}
                                    placeholder="Number of Dose"
                                    value={values.location}
                                    style={styles.name}
                                />
                                <TextInput
                                    onChangeText={handleChange('gap_days')}
                                    placeholder="Gap between doses"
                                    value={values.location}
                                    style={styles.name}
                                />
                                <TextInput
                                    onChangeText={handleChange('information')}
                                    placeholder="Additional Information"
                                    value={values.location}
                                    style={styles.field}
                                    multiline={true}
                                    numberOfLines={6}
                                />

                                <TouchableOpacity style={styles.submit}onPress={handleSubmit} title="Submit">
                                    <Text>Submit</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
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
        height:'85%',
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
    },
    form:{
        width:380,
        paddingTop:20
    },
    name:{
        width:'80%',
        height:35,
        marginLeft:20,
        padding:10,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#000",
        borderRadius:5,
        marginBottom:15
    },
    field:{
        marginLeft:20,
        padding:5,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#000",
        borderRadius:5,
        width:'80%',
    },
    submit:{
        marginLeft:130,
        marginTop:10,
        borderWidth:1,
        borderColor:'#000',
        borderStyle:'solid',
        borderRadius:5,
        width:80,
        paddingLeft:18,
        paddingTop:5,
        height:30
    }
})

export default Vaccines;