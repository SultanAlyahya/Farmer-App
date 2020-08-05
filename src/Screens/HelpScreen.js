import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Text, TextInput, ScrollView} from 'react-native'
import {socket} from '../socket/socketIo'


const Help =()=> {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    
    
    useEffect(()=>{
        socket.removeEventListener("message")
        socket.on('message', (newMessage)=>{
            if(newMessage.message === '')
                return
            const newChat = chat
            newChat.push({message: newMessage.message, id: newMessage.id})
            setChat([...newChat])
        })
    },[])


    const send =()=> {
        socket.emit('message', message)
        setMessage('')
    }

    return(
        <View style={{flex:1, backgroundColor: '#ededed'}}>
            <ScrollView style={{flex:1}}>

            {chat.map((textMessage, index)=>(
                
                <View key={index+''+textMessage.message} style={{backgroundColor: '#fff', margin: 2, padding: 10,
                borderRadius: 10}}>
                    {textMessage.id === socket.id?
                    <Text style={{color: '#3ba8e7'}}>me</Text>
                    :
                    <Text style={{color: '#33dd33'}}>assistant</Text>
                    }
                    <Text key={index+''+textMessage.message} style={{fontSize: 20}}>{textMessage.message}</Text>
                </View>
                
            ))}

            </ScrollView>
            <View style={{backgroundColor: '#c3c3c3', flexDirection: 'row', paddingHorizontal: 20, paddingBottom:30, paddingTop: 15}}>
                <TextInput
                style={{flex: 1, borderWidth: 1, borderColor: '#000', borderRadius: 10, backgroundColor: '#fff', height: 50, fontSize: 25}}
                onChangeText={(text)=> setMessage(text)}
                value={message}
                />
                <TouchableOpacity style={{justifyContent:'center'}}
                onPress={()=> send()}>
                    <Text style={{fontSize: 20, marginHorizontal: 15}}>send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Help;