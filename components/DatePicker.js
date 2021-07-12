import React, {useState, useEffect} from 'react';
import{
    Text, View, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput, BackHandler
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'



const DateTime = (props) => {

    const[date, setDate]=useState()
    const[gathered, setGathered]=useState({day:""})
    const[done, setDone]=useState(false)
   
   
   
    //constant
    const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    useEffect(()=>{
        handleChanges()
    },[done])


    function handleChanges(val){
        props.get(val)
    }

    const[sub1, showSub1]=useState(false)
    const[showT1, setShowT1]=useState(false)
    const[subTime1, setT1 ] = useState('')
    const[time, setTime] = useState(new Date())


    const showTime1 =() =>{
        setShowT1(true);
    }
    const hideTime1 =() =>{
        setShowT1(false);
    }
    const show1 =() =>{
        showSub1(true);
    }



    const onTimeChange1 = (event, selectedDate)=> {
        hideTime1()
        show1()
        const currentTime = selectedDate || time;
        console.log(currentTime)
        console.log("Day: ", new Date(currentTime))
        let curr = new Date(currentTime);
        let nWeek = curr.getDay()
        let day= curr.getDate()
        let month= curr.getMonth()+1
        let year= curr.getFullYear()

        setGathered(prev =>{
            const newG = {...prev}
            newG.from=time
            return newG
        })
        let dWeek = dates[nWeek-1]
        let form = day+"/"+month+"/"+year
        console.log(dWeek+"  "+form)
        setT1(form)

        let clean ={
            day:dWeek,
            formal:form
        }
        handleChanges(clean)
        
    }






      
    

    return(
        <View>
        
            <View>
            <TouchableOpacity onPress={()=>{
                showTime1()
                show1()
            }}>
            {!sub1 ? 
                <Text style={s.init}>Pick Date</Text>:
                <Text style={s.init}>{subTime1}</Text>
            }
            </TouchableOpacity>
            {showT1 && <>
                <DateTimePicker
                    value={time}
                    mode='date'
                    display='default'
                    onChange={onTimeChange1}
                />
                
                </>
            }
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
    }
})

export default DateTime