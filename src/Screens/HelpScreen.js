import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Text, TextInput, ScrollView, FlatList, Platform} from 'react-native'
import {socket} from '../socket/socketIo'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Help =()=> {

    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])

    const socketId = socket.id
    
    useEffect(()=>{
        socket.removeEventListener()
        socket.on('userManagement', (newMessage)=>{
            console.log(newMessage)
        })
        socket.on('message', (newMessage)=>{
            if(newMessage.message === '')
                return;
            setChat(chat => [...chat, newMessage])
        })
    },[])


    const send =()=> {
        if(message === '')
            return;
        const newMessage = {message, messageId: chat.length+"",delivered: false, userId: socketId}
        setChat(chat => [...chat, newMessage])
        setMessage('')
        socket.emit('message', newMessage, (messageId)=>{
            console.log('the message has delivered')
            let newChat = chat
            newChat[messageId] = {...newMessage, delivered: true}
            console.log(newChat)
            setChat(newChat)        
        })
    }

    return(
        <View style={{flex:1, backgroundColor: '#ededed'}}>

            <FlatList
            data={chat}
            renderItem={({item})=>(
                <View style={{backgroundColor: '#fff', margin: 2, padding: 10,
                borderRadius: 10}}>
                    {item.userId === socketId?
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{color: '#3ba8e7'}}>me </Text>
                        {item.delivered === true?
                        <MaterialCommunityIcons name="check-all" size={18} color="black" />
                        :
                        <MaterialCommunityIcons name="check" size={18} color="black" />
                        }
                    </View>
                    :
                    <Text style={{color: '#33dd33'}}>assistant</Text>
                    }
                    <Text style={{fontSize: 20}}>{item.message}</Text>
                </View>
            )}
            keyExtractor={item=> item.messageId}
            />

            <View style={{backgroundColor: '#c3c3c3', flexDirection: 'row', paddingHorizontal: 20, paddingBottom:30, paddingTop: 15}}>
                <TextInput
                style={{flex: 1, borderWidth: 1, borderColor: '#000', borderRadius: 10, backgroundColor: '#fff', fontSize: 25, padding:5}}
                onChangeText={(text)=> setMessage(text)}
                value={message}
                multiline={true}
                numberOfLines={Platform.OS ==='ios'? null: 40}
                maxHeight={Platform.OS === 'ios'  ? 160 : null}
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