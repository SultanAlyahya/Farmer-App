import {observable, action, computed} from 'mobx'
import io from 'socket.io-client'

const socketURL = 'http://localhost:3000'

class LiveChatting{
    @observable socket = io(socketURL)
    @observable chat = []
    @observable delivered = new Date()

    @action sendMessage =(message)=> {
        this.chat.push(message)
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
        this.socket.on('message', (newMessage)=>{
            if(newMessage.message === '')
                return;
            const message = {...newMessage, messageId: this.chat.length+''}
            this.chat.push(message)
            this.delivered = new Date()
        })
    }
}

const liveChatting = new LiveChatting()

export default liveChatting