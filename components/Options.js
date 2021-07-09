import React, {useState, useEffect} from 'react';
import{
    Text, View, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTime from './DateTime'

const Options = (props) => {

    const[choiceH, setChoiceH]= useState({})
    const[visible, setVisible]=useState(false)
    const [hospitalList, updateHList]= useState([])
    const[value, setValue] = useState({
        id:props.id,
        hospital:{
            name:"",
            location:""
        },
        time:[]
    })

    //Done
    const[done, setDone]=useState(false)
    const showDone = () =>{
        setDone(true)
    }


    //Adding time
    const [pressed, setPressed] = useState(0);
    const index = pressed;
    let count = 0

    // function sendData(){
    //     console.log("function called")
    //     props.onChoice(choice)
    // }

    let listOfHospitals = []

    const handleHos = (data) =>{
        updateHList(data);
    }


    useEffect(function fetchChoice(){
        console.log("UseEffect called")
        async function fetching(){
            
            const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/hospitals', {
            method:'GET'
            })
            const final = await rawResponse.json()
            final.hospitals.map((items)=>{
                console.log("Found", items.name)
                listOfHospitals = [...listOfHospitals, items]
                console.log(listOfHospitals)
            })
            handleHos(listOfHospitals)
        }
        fetching()
    }, [])


    function handleChanges(){
        props.get(value)
    }

    function getData(val){

        setValue(prev =>{
            const newV = {...prev}
            let found = false
            newV.time.map((item)=>{
                if(item.id == val.id){
                    found=true
                    if(item.day != val.day){
                        item.day = val.day
                    }
                    if(item.from != val.from){
                        item.from = val.from
                    }
                    if(item.to != val.to){
                        item.to = val.to
    
                    }
                }
            })
            if(found == false && newV.time[0]!={}){
                let temp = {
                    id:val.id,
                    day:val.day,
                    from:val.from,
                    to:val.to
                }
                newV.time = [...newV.time, temp]
            }
            return newV;
        })

        handleChanges()

    }

    function setDay(val){

    }


    

    const showV = () =>{
        setVisible(true)
    }
    const hideV = () => {
        setVisible(false)
    }

    //send to parent
    //props.onChoice(item)

    let arr = value.time

    return(
        <View>
            <TouchableOpacity style={s.init} onPress={()=>{
                showV()
                console.log("Data:", hospitalList)
            }}>
            {choiceH.name && choiceH != {}? 
                <Text>{choiceH.name}</Text> :            
                <Text>Select Hospital</Text>
            }
            </TouchableOpacity>

            <View style={s.list}>
                {visible &&
                    <TouchableOpacity onPress={()=>{
                        setChoiceH({})
                        hideV()
                    }}>
                        <Text>None</Text>
                    </TouchableOpacity>
                }{visible &&
                    hospitalList.map((item) =>(
                        <TouchableOpacity onPress={()=>{
                            setChoiceH(item)
                            hideV()
                            setValue(prev =>{
                                const newV = {...prev}
                                newV.hospital.name=item.name
                                newV.hospital.location=item.location
                                return newV
                            })
                            handleChanges()
                        }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                   }
            </View>
            

            {
                [...Array(index)].map((current)=>{
                return(
                    <DateTime id={++count} get={getData}/>
                )
            })}

            <TouchableOpacity onPress={()=>{
                setPressed(pressed+1)
            }}>
                <Text> +   Add more time</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{
                showDone()
            }}>
                <Text>Set Hospital</Text>
            </TouchableOpacity>
            {done && arr ? arr.map((item)=>{
                <>
                    <Text>Day: {item.day}</Text>
                    <Text>From: {item.from}</Text>
                    <Text>To: {item.to}</Text>
                </>
                
            })
                 :
                <Text>Empty</Text>
            }

            






            
        </View>
        
        
    )
}

const s = StyleSheet.create({
    init:{
        width:'30%',
        borderWidth:2,
        borderColor:'#000',
        borderStyle:'solid',
    },
    list:{
        width:150,
        backgroundColor:'#EEE',
        elevation:3,
        shadowColor:"#000",
        padding:5
    }
})

export default Options