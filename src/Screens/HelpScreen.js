import React, {useEffect, useState, useRef} from 'react'
import {View, TouchableOpacity, Text, TextInput, FlatList, Platform, KeyboardAvoidingView, Animated, Dimensions} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import socketIO from '../Mobx/socketIO'
import 'mobx-react-lite/batchingForReactNative'
import {Audio} from 'expo-av'
import * as Permissions from 'expo-permissions';


const socketId = socketIO.socket.id

let recording = new Audio.Recording();
const {width} = Dimensions.get('window')


const Help = observer( ()=> {

    const [message, setMessage] = useState('')
    const [isRecording, setIsRecording] = useState(false)

    const sendDisable = useRef(false)
    const startTextMessage = useRef(new Animated.Value(1)).current;
    const isTexting = useRef(false)
    
    useEffect(()=>{
        socketIO.listenToMessages();
       
        (async()=>{
            const { granted } = await Permissions.askAsync(Permissions.AUDIO_RECORDING)
            console.log(granted)
            await Audio.setAudioModeAsync({allowsRecordingIOS: true, playsInSilentModeIOS: true});
        })();
        
    },[])


    useEffect(()=>{
        if(message != ''){
            if(!isTexting.current && !isRecording){
                hideMic()
            }
        }else{
            if(isTexting.current){
                showMic()
            }
        }
    })

    const hideMic =()=>{
        console.log('hide')
        isTexting.current = true
        Animated.timing(startTextMessage, {
            toValue:0,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    const showMic =()=>{
        console.log('show')

        isTexting.current = false
        Animated.timing(startTextMessage, {
            toValue:1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }



    const sendTextMessage = async()=> {
        sendDisable.current = true
        const messageCopy = message
        setMessage('')
        if(messageCopy === ''){
            sendDisable.current = false
            return;
        }
        const newMessage = {message: messageCopy, messageId: socketIO.chat.length+"",delivered: false, userId: socketId, content: 'text'}
        socketIO.sendMessage(newMessage)
        setTimeout(()=>{
            sendDisable.current = false
        },500)
        
    }

    const startRecording =async()=> {
        try {
            setIsRecording(true)
            await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
            await recording.startAsync();
            const status = await recording.getStatusAsync()
            console.log(status)
          } catch (error) {
            console.log(error)
          }
    }

    const stopRecording =async()=> {
        try{
            setIsRecording(false)
            await recording.stopAndUnloadAsync()
            const play = await recording.createNewLoadedSoundAsync()
            const VoiceMessage = {sound: play.sound, messageId: socketIO.chat.length+"",delivered: false, userId: socketId, content: 'voice'}
            socketIO.sendVoiceMessage(VoiceMessage)
            recording = new Audio.Recording()
        }catch(error){
            console.log(error)
        }
    }

    const playVoiveMessage =async(soundObject)=> {
        await soundObject.replayAsync()
    }

    const deleteVoice =async()=> {
        setIsRecording(false)
        await recording.stopAndUnloadAsync()
        recording = new Audio.Recording()
    }

    return(
        <KeyboardAvoidingView style={{flex:1, backgroundColor: '#ededed'}}  behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={ Platform.OS === 'ios' ? 40 : 0}>

            <FlatList
            data={socketIO.getChat}
            inverted
            extraData={socketIO.delivered}
            renderItem={({item})=>(
                <View>
                    {item.content === 'text'?
                    
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
                    :
                    <TouchableOpacity style={{height: width/3, width: width/3, borderRadius: 360, backgroundColor: '#fff', margin: 5}}
                    
                    onPress={()=> playVoiveMessage(item.sound)}>
                            <MaterialCommunityIcons name='play' size={width/3}/>
                    </TouchableOpacity>
                    }
                </View>
            )}
            keyExtractor={item=> item.messageId}
            onScrollToIndexFailed={(error)=> console.log(error)}
            />

            <View style={{backgroundColor: '#c3c3c3', flexDirection: 'row', paddingHorizontal: 20, paddingBottom:30, paddingTop: 15}}>
                <TextInput
                style={{flex: 1, borderWidth: 1, borderColor: '#000', borderRadius: 10, backgroundColor: '#fff', fontSize: 25, padding:5}}
                onChangeText={(text)=> sendDisable.current? undefined : setMessage(text)}
                value={message}
                multiline={true}
                numberOfLines={Platform.OS ==='ios'? null: 40}
                maxHeight={Platform.OS === 'ios'  ? 160 : null}
                placeholder='message'
                />
                <View>
                    <Animated.View style={[{ position:'absolute', backgroundColor:'#c3c3c3', zIndex:1, flexDirection: 'row', width: '100%', height: '100%', flexDirection: 'row', justifyContent: 'center'},
                {
                    transform: [{ scale: startTextMessage }]
                  }]}>
                        {!isRecording?
                        <TouchableOpacity disabled={message !== ''} style={{ justifyContent:'center', paddingHorizontal:15,  width: '100%'}}
                        onPress={()=> startRecording()}>
                            <MaterialCommunityIcons name='microphone' size={36}/>
                        </TouchableOpacity>
                        :
                        <View style={{justifyContent: 'center'}}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity style={{ justifyContent:'center'}}
                                onPress={()=> stopRecording()}>
                                    <MaterialCommunityIcons name='play' size={32}/>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ justifyContent:'center', }}
                                onPress={()=> deleteVoice()}>
                                    <MaterialCommunityIcons name="delete-forever" size={32} color="black" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    </Animated.View>
                    <TouchableOpacity disabled={sendDisable.current}  style={{justifyContent:'center', paddingHorizontal: 15}}
                    onPress={()=> sendTextMessage()}
                    >
                        <Text style={{fontSize: 20}}>send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
})

export default Help;