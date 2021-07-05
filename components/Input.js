import React from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

const Input = (props) => {
    return (
        <View>
            <TextInput style={[styles.input, props.error && styles.border]} {...props}/>
            {props.errorText && (
                <Text style={styles.error}>{props.errorText}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor:'#FFF',
        height:50,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:25,
        borderRadius:8
    },
    border:{
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#FF00"
    },
    error:{
        color:"#65FF00",
        fontWeight:'bold',
    }
    
})

export default Input;