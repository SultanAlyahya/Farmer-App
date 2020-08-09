import {observable, action, computed} from 'mobx'
import io from 'socket.io-client'
import { Audio } from 'expo-av';

const socketURL = 'http://localhost:3000'
const soundSender = new Audio.Sound()
const soundReceiver = new Audio.Sound()

class LiveChatting{
    @observable socket = io(socketURL)
    @observable chat = []
    @observable delivered = new Date()

    @action sendMessage = async(message)=> {
        this.chat.push(message)
        console.log(soundSender._loaded)
        if(!soundSender._loaded){
            await soundSender.loadAsync(require('../../assets/sendMessage.mp3'));
            await soundSender.playAsync();
        }
        else{
            await soundSender.replayAsync()
        }
        this.socket.emit('message', message, (messageId)=>{
            console.log('the message has delivered')
            this.chat.forEach(messages=>{
                if(message.messageId === messageId){
                    messages.delivered = true
                    this.delivered = new Date()
                }
            })       
        })
    }

    @action listenToMessages =()=>{
        this.socket.removeEventListener()
        this.socket.on('userManagement', (newMessage)=>{
            console.log(newMessage)
        })
        this.socket.on('message', async(newMessage)=>{
            if(newMessage.message === '')
                return;
            const message = {...newMessage, messageId: this.chat.length+'', content: 'text'}
            this.chat.push(message)
            this.delivered = new Date()
            if(!soundReceiver._loaded){
                await soundReceiver.loadAsync(require('../../assets/sendMessage.mp3'));
                await soundReceiver.playAsync();
            }
            else{
                await soundSender.replayAsync()
            }
        })
    }

    @action sendVoiceMessage =(VoiceMessage)=> {
        this.chat.push(VoiceMessage)
        // this.socket.emit('message', VoiceMessage, (messageId)=>{
        //     console.log(messageId)
        // })
        this.delivered = new Date()
    }

    @computed get getChat(){
        return this.chat.slice().reverse()
    }
}

const liveChatting = new LiveChatting()

export default liveChatting