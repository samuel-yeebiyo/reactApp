import React, {useState, useEffect} from 'react';
import{
    Text, View, Modal, TouchableOpacity, StyleSheet, Dimensions, ScrollView, TextInput, BackHandler
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';



const DateTime = (props) => {

    //change view
    const[showT1, setShowT1]=useState(false)
    const[showT2, setShowT2]=useState(false)
    const[sub1, showSub1]=useState(false)
    const[sub2, showSub2]=useState(false)
    const[showD, setShowD]=useState(false)


    const[date, setDate]=useState()
    const[gathered, setGathered]=useState({id:props.id, day:"", from:"", to:""})
    const[done, setDone]=useState(false)

    //sub times
    const[subTime1, setT1 ] = useState('')
    const[subTime2, setT2 ] = useState('')
    const[time, setTime] = useState(new Date())
   
   
   
    //constant
    const dates = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    
    useEffect(()=>{
        handleChanges()
    },[done])


    function handleChanges(){
        props.get(gathered)
    }


    const showDate =(bool) =>{
        setShowD(bool || true);
    }

    //SHOW
    const showTime1 =() =>{
        setShowT1(true);
    }
    const showTime2 =() =>{
        setShowT2(true);
    }
    const showDone = () =>{
        setDone(true)
    }
    const show1 =() =>{
        showSub1(true);
    }
    const show2 =() =>{
        showSub2(true);
    }

    //HIDE
    const hideTime1 =() =>{
        setShowT1(false);
    }
    const hideTime2 =() =>{
        setShowT2(false);
    }

    const onTimeChange1 = (event, selectedDate)=> {
        hideTime1()
        show1()
        const currentTime = selectedDate || time;
        console.log(currentTime)
        console.log(new Date(currentTime).getHours())
        let curr = new Date(currentTime);
        let hour = curr.getHours()
        let minute = curr.getMinutes()
        let time= hour+":"+minute
        setT1(time)
        console.log(props.id)
        setGathered(prev =>{
            const newG = {...prev}
            newG.from=time
            return newG
        })
        handleChanges()
        
    }
    const onTimeChange2 = async (event, selectedDate)=> {
        hideTime2()
        show2()
        const currentTime = selectedDate || time;
        console.log(currentTime)
        console.log(new Date(currentTime).getHours())
        let curr = new Date(currentTime);
        let hour = curr.getHours()
        let minute = curr.getMinutes()
        let time= hour+":"+minute
        setT2(time)
        console.log(props.id)
        setGathered(prev =>{
            const newG = {...prev}
            newG.to=time
            return newG
        })
        handleChanges()
    }   
    

    return(
        <View>
        
            <View>
                <TouchableOpacity onPress={showDate}>
                {!date ? 
                    <Text style={s.init}>Pick Date</Text>:
                    <Text style={s.init}>{date}</Text>
                }
                </TouchableOpacity>
                <View style={s.list}>
                    {showD && 
                        dates.map((item) =>(
                            <TouchableOpacity onPress={()=>{
                                setDate(item)
                                setShowD(false)
                                setGathered(prev =>{
                                    const newG = {...prev}
                                    newG.day=item
                                    return newG
                                })
                                handleChanges()
                            }}>
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        ))
                        
                    }
                </View>

            </View>

            <View>
                <TouchableOpacity onPress={()=>{
                    showTime1()
                    show1()
                }}>
                {!sub1 ? 
                    <Text style={s.init}>Pick Start Time</Text>:
                    <Text style={s.init}>{subTime1}</Text>
                }
                </TouchableOpacity>
                {showT1 && <>
                    <DateTimePicker
                        value={time}
                        mode='time'
                        display='default'
                        minuteInterval={5}
                        onChange={onTimeChange1}
                    />
                    
                    </>
                }
            </View>

            <View>
                <TouchableOpacity onPress={()=>{
                    showTime2()
                    show2()
                }}>
                {!sub2 ? 
                    <Text style={s.init}>Pick End Time</Text>:
                    <Text style={s.init}>{subTime2}</Text>
                }
                </TouchableOpacity>
                {showT2 && <>
                    <DateTimePicker
                        value={time}
                        mode='time'
                        display='default'
                        minuteInterval={5}
                        onChange={onTimeChange2}
                    />
                    
                    </>
                }
            </View>

            <TouchableOpacity onPress={()=>{
                showDone()
            }}>
                <Text>Set Time</Text>
            </TouchableOpacity>
            {done && <>
                <Text> Day: {gathered.day}</Text>
                <Text> From: {gathered.from}</Text>
                <Text> To: {gathered.to}</Text>

            </>}
        
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

export default DateTime