import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, Image, View} from 'react-native';
import {useForm, Controller }from 'react-hook-form'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Input from '../../components/Input'
import * as ImagePicker from 'expo-image-picker'


const Register = ({navigation}) => {

    const[password, setPassword]= useState();
    const[user, setUser]=useState({})
    const[photo, setPhoto]=useState()
    const[show, setShow] =useState(false)


    const {control, handleSubmit, formState: {errors}} = useForm();

    const constructor = () =>{
        console.log("Passed Register")
    }
    constructor()

    const handlePhoto = async()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3],
            quality:1,
            base64:true
        })

        console.log("Result  ",result);

        if(!result.cancelled){
            setPhoto(result)
        }
        setShow(true)
    }
    
    const onSubmit = async (data) => {
        let permission;
        let jsonString
        console.log(data);

        try{
            //uploading the image
            await fetch('http://192.168.10.159:3000/upload/',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    imgsource:photo.base64,
                    id:data.passnumber
                })
            }).then(response => response.json())
            .then((response)=>{
                console.log('upload success', response);
            }).catch((error)=>{
                console.log('upload error', error);                
            })

            await fetch('http://192.168.10.159:3000/users/', {
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:data.username,
                    passport:data.passnumber,
                    password:data.password,
                })
            }).then(response => response.json())
            .then(final=> {
                console.log("returned")
                permission = final.allow;
                const userReturned = final.payload;

                console.log("Permission:", permission);
                
                jsonString = JSON.stringify(userReturned)
                console.log("Returned User:",jsonString)

                persist(jsonString);

                if(permission == true){
                    console.log("Allowed")
                    navigation.replace("loading")
                }
            })


        }catch(e){}


        // try{
           
        // }catch(e){}

        

        

    };

    const persist = async(data) =>{
        try{
            await AsyncStorage.setItem('user', data);
        }catch(errs){
            console.log(errs)
        }
    }


    var PN_REGEX = /^(?!^0+$)[a-zA-Z0-9]{6,9}$/g;
    var PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/g;
    var USER_REGEX = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/g;



    return (
        <View style={styles.main}>
        <View style={styles.hero}>
            <Text style={styles.bigText}>COVID-19 Vaccination Information System</Text>
            <View style={styles.form}>

                <View>
                {show &&
                    <Image
                        source={{uri:photo.uri}}
                        style={{width:100, height:100}}
                    />
                }
                    <TouchableOpacity style={styles.butt} onPress={handlePhoto}>
                        <Text style={styles.buText}>Choose Image</Text>
                    </TouchableOpacity>
                </View>

                <Controller 
                    control={control}
                    render = {({field:{onChange, value}})=>(
                        <Input error = {errors.username} errorText={errors.username?.message} placeholder={"Username"} onChangeText={value => onChange(value)} value={value}/>
                    )}
                    name="username"
                    rules={{
                        required:{
                            value:true,
                            message:"Username is required"
                        },
                        pattern:{
                            value:USER_REGEX,
                            message:"Only alphanumeric characters allowed"
                        }
                    }}
                />
                <Controller 
                control={control}
                render={({field:{onChange, value}})=>(
                    <Input error = {errors.passnumber} errorText={errors.passnumber?.message} style={styles.input} placeholder={"Passport Number"} onChangeText={value => onChange(value)} value={value}/>
                )}
                name="passnumber"
                rules={{
                    required:{
                        value:true,
                        message:"Passport Number is required"
                    },
                    pattern:{
                        value:PN_REGEX,
                        message:"Passport Number is invalid"
                    }
                }}
                />
                <Controller 
                control={control}
                rules={{required:true,}}
                render={({field:{onChange, value}})=>(
                    <Input secureTextEntry={true} error = {errors.password} errorText={errors.password?.message} style={styles.input} placeholder={"Password"} onChangeText={value => {onChange(value), setPassword(value)}} value={value} />
                )}
                name="password"
                rules={{
                    required:{
                        value:true,
                        message:"Please choose a password"
                    },
                    pattern:{
                        value:PASS_REGEX,
                        message:"One digit, one lowercase, one uppercase, at least 8"
                    }
                }}
                />
                <Controller 
                control={control}
                rules={{required:true,}}
                render={({field:{onChange, password, value}})=>(
                    <Input secureTextEntry={true} error = {errors.passagain} errorText={errors.passagain?.message} style={styles.input} style={styles.input} placeholder={"Confirm Password"} onChangeText={value => {
                        onChange(value);
                        if(value == password){
                            console.log(value);
                        }
                    }} value={value}/>
                )}
                name="passagain"
                rules={{
                    required:{
                        value:true,
                        message:"Please confirm password"
                    },
                    validate:(value)=>{
                        if(value != password){
                            return("Please match password")
                        }
                    }
                }}
                />
            </View>
        </View>
        <View style={styles.buttons}>
            <View style={styles.line}>
                <Text style={styles.append}>Already have an account? </Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Sign In')}>
                    <Text style={styles.sign}>Sign In</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.access}>

            {/*This should check input form and then navigate*/}
                <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}> 
                    <Text style = {styles.buText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    butt:{
        borderWidth:1,
        borderStyle:'solid',
        borderColor:"#FFF",
        width:90,
        height:20
    },
    main:{
        width:'100%',
        height:'100%',
        backgroundColor:'#21264b',
        paddingTop:50,
        paddingLeft:20,
        paddingRight:20,
        alignItems:'center'
    },
    hero:{
        width:'80%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:'10%'
    },
    bigText:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        color:"#FFF"
    },
    form:{
        marginTop:90,
        width:'100%',
    },
    input:{
        backgroundColor:'#FFF',
        height:50,
        width:'100%',
        paddingLeft:20,
        paddingRight:20,
        marginTop:25,
        borderRadius:8
    },
    buttons:{
        position:'absolute',
        bottom:60,
        width:'100%',
    },
    line:{
        flexDirection:'row',
        alignSelf:'center'
    },
    append:{
        fontSize:16,
        color:'#FFF'
    },
    sign:{
        textAlign:'center',
        height:20,
        color:"#FFF",
        textDecorationLine:'underline',
        fontWeight:'bold',
        fontSize:16,
    },
    access:{
        flexDirection:'row',
        marginTop:30,
        height:70,
        width:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        height:60,
        width:120,
        backgroundColor:'#000',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        position:'relative',
    },
    buText:{
        textAlign:'center',
        color:'#FFF',
        fontWeight:'bold'
        
    }
})

export default Register;