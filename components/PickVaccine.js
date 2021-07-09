import React, {useState, useEffect} from 'react';
import{
    Text, View, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import DateTime from './DateTime'

const Options = (props) => {

    const[choiceH, setChoiceH]= useState({})
    const[visible, setVisible]=useState(false)
    const [vaccineList, updateVList]= useState([])
    const[value, setValue] = useState({})


    let listOfVaccines = []

    const handleVac = (data) =>{
        updateVList(data);
    }


    useEffect(function fetchChoice(){
        console.log("UseEffect called")
        async function fetching(){
            
            const rawResponse = await fetch('http://192.168.10.159:3000/healthcare/vaccines', {
            method:'GET'
            })
            const final = await rawResponse.json()
            console.log(final);
            final.vaccines.map((items)=>{
                console.log("Found", items.name)
                listOfVaccines = [...listOfVaccines, items]
                console.log(listOfVaccines)
            })
            handleVac(listOfVaccines)
        }
        fetching()
    }, [])


    function handleChanges(val){
        props.get(val)
    }

    const showV = () =>{
        setVisible(true)
    }
    const hideV = () => {
        setVisible(false)
    }



    return(
        <View>
            <TouchableOpacity style={s.init} onPress={()=>{
                showV()
                console.log("Data:", vaccineList)
            }}>
            {choiceH.name && choiceH != {}? 
                <Text>{choiceH.name}</Text> :            
                <Text>Select Vaccine</Text>
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
                    vaccineList.map((item) =>(
                        <TouchableOpacity onPress={()=>{
                            // setValue(item)
                            setChoiceH(item)
                            hideV()
                            handleChanges(item)
                        }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                   }
            </View>

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