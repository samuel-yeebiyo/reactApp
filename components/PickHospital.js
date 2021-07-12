import React, {useState, useEffect} from 'react';
import{
    Text, View, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput
} from 'react-native'


const Options = (props) => {

    const[choiceH, setChoiceH]= useState({})
    const[visible, setVisible]=useState(false)
    const [hospitalList, updateHList]= useState([])
    const[value, setValue] = useState({})


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

            <View style={visible && s.list}>
                {visible &&
                    <TouchableOpacity style={s.li}onPress={()=>{
                        setChoiceH({})
                        hideV()
                    }}>
                        <Text>None</Text>
                    </TouchableOpacity>
                }{visible &&
                    hospitalList.map((item) =>(
                        <TouchableOpacity style={s.li}onPress={()=>{
                            setChoiceH(item)
                            hideV()
                            setValue(item)
                            handleChanges(item)
                        }}>
                            <Text>{item.name}</Text>
                        </TouchableOpacity>
                    ))
                   }
            </View>
        </View>
        </View>
        
        
    )
}

const s = StyleSheet.create({
    init:{
        width:'75%',
        borderColor:"#AAA",
        borderWidth:1,
        borderStyle:'solid',
        padding:10,
        alignSelf:'center',
        height:40,
        borderRadius:8,
        marginBottom:5
    },
    list:{
        width:'74%',
        padding:5,
        alignSelf:'center',
        shadowColor:"#000",
        elevation:1,
        shadowRadius:40,
        marginBottom:20
    },
    li:{
        height:30,
        padding:10,
    }
})

export default Options