import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Item = (props) => {
    return (
        <View style = {styles.item}>
            <View style = {styles.left}>
                <TouchableOpacity style={styles.circle}></TouchableOpacity>
                <Text style={styles.text}>{props.text}</Text>
            </View>
            <View style={styles.artifact}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        marginTop:25,
        width:'100%',
        backgroundColor:'#E4E4E4',
        padding:15,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    left:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    circle:{
        backgroundColor:'#FF5555',
        borderRadius:50,
        marginRight:10,
        width:20,
        height:20
    },
    text:{

    },
    artifact:{
        width:12,
        height:12,
        borderColor:'#000',
        borderWidth:3,
        borderRadius:60

    }
})

export default Item;