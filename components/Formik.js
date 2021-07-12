import React from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Formik, Form, Field, useFormik } from 'formik';

const Forming = () =>{

    return(
        <Formik
            initialValues={{
                name: '',
                location:''
            }}
            onSubmit={async (values) => {
                const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/hospital/add',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name:values.name,
                        location:values.location
                    })
                })
            }}>

            {({ handleChange, handleSubmit, values }) => (
                <View style={s.form}>
                    <TextInput
                        style={s.name}
                        onChangeText={handleChange('name')}
                        placeholder="Hospital Name"
                        value={values.name}
                    />
                    <TextInput
                        style={s.location}
                        onChangeText={handleChange('location')}
                        placeholder="Hospital Location"
                        value={values.location}
                    />
                    <TouchableOpacity style={s.submit} onPress={handleSubmit} title="Submit">
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}


const s = StyleSheet.create({
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
        marginBottom:20
    },
    location:{
        width:'80%',
        height:35,
        marginLeft:20,
        padding:10,
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#000",
        borderRadius:5,
        marginBottom:20
    },
    add:{
        marginLeft:20,
        marginTop:15,
        borderRadius:20,
        borderWidth:1,
        borderColor:'#000',
        borderStyle:'solid',
        width:110,
        height:30,
        padding:6
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



export default Forming;