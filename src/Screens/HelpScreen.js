import React, {useEffect, useState} from 'react'
import {View, TouchableOpacity, Text, TextInput, FlatList, Platform, KeyboardAvoidingView} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import socketIO from '../Mobx/socketIO'
import 'mobx-react-lite/batchingForReactNative'


const Help = observer( ()=> {

    const [message, setMessage] = useState('')
    const [sendDisable, setSendDisable] = useState(false)

    const socketId = socketIO.socket.id
    
    useEffect(()=>{
        socketIO.listenToMessages()
    },[])

    
    const send = async()=> {
        setSendDisable(true)
        if(message === ''){
            setSendDisable(false)
            return;
        }
        const newMessage = {message, messageId: socketIO.chat.length+"",delivered: false, userId: socketId}
        socketIO.sendMessage(newMessage)
        setMessage('')
        setTimeout(()=>{
            setSendDisable(false)
        },150)
        
    }

    return(
        <KeyboardAvoidingView style={{flex:1, backgroundColor: '#ededed'}}  behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : 0}>

            <FlatList
            data={socketIO.getChat}
            inverted
            extraData={socketIO.delivered}
            renderItem={({item})=>(
                <View style={{backgroundColor: '#fff', margin: 2, padding: 10, borderRadius: 10}}>
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
            onScrollToIndexFailed={(error)=> console.log(error)}
            />

            <View style={{backgroundColor: '#c3c3c3', flexDirection: 'row', paddingHorizontal: 20, paddingBottom:30, paddingTop: 15}}>
                <TextInput
                style={{flex: 1, borderWidth: 1, borderColor: '#000', borderRadius: 10, backgroundColor: '#fff', fontSize: 25, padding:5}}
                onChangeText={(text)=> sendDisable? undefined :setMessage(text)}
                value={message}
                multiline={true}
                numberOfLines={Platform.OS ==='ios'? null: 40}
                maxHeight={Platform.OS === 'ios'  ? 160 : null}
                placeholder='message'
                
                />
                <TouchableOpacity disabled={sendDisable}  style={{justifyContent:'center'}}
                onPress={()=> send()}>
                    <Text style={{fontSize: 20, marginHorizontal: 15}}>send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
})

export default Help;