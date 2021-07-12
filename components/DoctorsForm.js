import React, {useState}from 'react'
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import Select from './Options'


let values = []
function getData(val){
    console.log("Value from Child Components : ",val);
    let found =  false
    values.map((item)=>{
        console.log("Item Value:  ", item)
        if(item.id == val.id){
            found=true
            if(item.hospital.name != val.hospital.name){
                item.hospital.name = val.hospital.name
            }
            if(item.hospital.location != val.hospital.location){
                item.hospital.location = val.hospital.location
            }
            let subFound
            let index = 0
            if(item.time.length != 0){
                for(let index=0;index<item.time.length;index++){
                    if(item.time[index].id == val.time[index].id){
                        subFound = true;
                        if(item.time[index].day != val.time[index].day){
                            item.time[index].day = val.time[index].day
                        }
                        if(item.time[index].from != val.time[index].from){
                            item.time[index].from = val.time[index].from
                        }
                        if(item.time[index].to != val.time[index].to){
                            item.time[index].to = val.time[index].to
    
                        }
                    }
                }

                if(item.time.length < val.time.length){
                    let temp = {
                        id:val.time[item.time.length].id,
                        day:val.time[item.time.length].day,
                        from:val.time[item.time.length].from,
                        to:val.time[item.time.length].to
                    }
    
                    item.time = [...item.time, temp]
                }

            }else if( val.time.length != 0){
                let temp = {
                    id:val.time[index].id,
                    day:val.time[index].day,
                    from:val.time[index].from,
                    to:val.time[index].to
                }

                item.time = [...item.time, temp]
            }
        }
    })
    if(found==false){
        values = [...values, val]
    }
}



const Container = (props) =>{

    const [pressed, setPressed] = useState(0);
    const index = pressed;    
    let count=0;




    return(
        <Formik
            initialValues={{
                name: '',
                hospital:''
            }}
            onSubmit={async (form) => {
                props.nav()
                const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/doctor/add',{
                    method:'POST',
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        name:form.name,
                        access:values
                    })
                })
                values=[]                
            }}>

            {({ handleChange, handleSubmit, values }) => (
                <View style={s.form}>
                    <TextInput
                        onChangeText={handleChange('name')}
                        placeholder="Doctor Name"
                        value={values.name}
                        style={s.name}
                    />
                    {[...Array(index)].map(()=>{
                        return(
                            <Select id={++count} get={getData}/>
                        )
                    })}
                    
                    <TouchableOpacity style={s.add} onPress={()=>{
                        setPressed(pressed+1)
                    }}>
                        <Text> +    Add Hospital</Text>
                    </TouchableOpacity>
                    
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
        borderRadius:5
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

export default Container;