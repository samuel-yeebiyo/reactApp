import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Item from './components/Item';


function HomeScreen(){
  return (
    <View style={styles.inner}>
      <Text>This is the text I want here</Text>
    </View>
  )
}

const Stack = createStackNavigator();

export default function App() {

  const [item, setItem] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddItem = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, item]);
    setItem(null);
  }

  const completeTask = (index) =>{
    let copy = [...taskItems];
    copy.splice(index, 1);
    setTaskItems(copy);
  }
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/*title*/}
      <View style={styles.inner}>
        <Text style={styles.title}>App Title</Text>

        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Back" component={HomeScreen}/>
          </Stack.Navigator>
        </NavigationContainer>

        {/*items*/}
        <View style={styles.list}>
          {
            taskItems.map((item, index) =>{
              return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                  <Item key={index} text={item}/>
                </TouchableOpacity>
              )
            })    
          } 
        </View>

      </View>

      {/*modification*/}
      <KeyboardAvoidingView 
        behavior="height"
        style={styles.write}
        >
        {/*Text input*/}
        <TextInput
        style={styles.input}
        placeholder={"Add a task"}
        value={item}
        onChangeText={text => setItem(text)}>
        </TextInput>

        {/*Button*/}
        <TouchableOpacity onPress={() => handleAddItem()}>
          <View style={styles.adding}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    width:'90%',
    height:'100%',
    backgroundColor:'#FFF',
    paddingTop:50,
    marginLeft:20,
    //flex: 1,
    //backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    color:'#000',
    fontSize:24,
    fontWeight:'bold'
  },
  text: {
    color:'#000'
  },
  write:{
    position:'absolute',
    bottom:30,
    flexDirection:'row',
    width:'99%',
    justifyContent:'space-between'
  },
  input:{
    backgroundColor:'#E4E4E4',
    width:'70%',
    height:40,
    paddingHorizontal:15,
    borderRadius:20
  },
  adding:{
    width:40,
    height:40,
    borderRadius:60,
    backgroundColor:'#E4E4E4',
    justifyContent:'center',
    alignItems:'center'
  },
  addText:{},

});
