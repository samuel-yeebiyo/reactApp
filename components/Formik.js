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
                <View>
                    <TextInput
                        onChangeText={handleChange('name')}
                        placeholder="Hospital Name"
                        value={values.name}
                    />
                    <TextInput
                        onChangeText={handleChange('location')}
                        placeholder="Hospital Location"
                        value={values.location}
                    />
                    <TouchableOpacity onPress={handleSubmit} title="Submit">
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </Formik>
    )
}

export default Forming;