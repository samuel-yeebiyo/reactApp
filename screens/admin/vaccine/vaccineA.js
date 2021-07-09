import React, {useState, useEffect} from 'react';
import { Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text, TextInput, Button, TouchableWithoutFeedback,TouchableOpacity, View, BackHandler } from 'react-native';
import { Formik, Form, Field, useFormik } from 'formik';
import { StackActions } from '@react-navigation/routers';



function Vaccines({navigation}){

    useEffect( () =>{
        const backAction = () =>{
            navigation.dispatch(StackActions.pop(1))
            return true
        }
        const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction)
        return ()=>backHandler.remove()
    }, []);


    return (
        <View style={s.main}>
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
                }}>

                {({ handleChange, handleSubmit, values }) => (
                    <View>
                        <TextInput
                            onChangeText={handleChange('name')}
                            placeholder="Vaccine Name"
                            value={values.name}
                        />
                        <TextInput
                            onChangeText={handleChange('nDose')}
                            placeholder="Number of Dose"
                            value={values.location}
                        />
                        <TextInput
                            onChangeText={handleChange('gap_days')}
                            placeholder="Gap between doses"
                            value={values.location}
                        />
                        <TextInput
                            style={s.field}
                            onChangeText={handleChange('information')}
                            placeholder="Additional Information"
                            value={values.location}
                        />

                        <TouchableOpacity onPress={handleSubmit} title="Submit">
                            <Text>Submit</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const s = StyleSheet.create({
    main:{
        paddingTop:100,
        paddingLeft:100
    },
    field:{
        width:200,
        height:80,
        backgroundColor:"#EEE"
    }
})

export default Vaccines;