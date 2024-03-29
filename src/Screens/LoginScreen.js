import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import 'mobx-react-lite/batchingForReactNative'
import userStore from '../Mobx/userStore'
import {saveUserData} from '../db/userdb'

const win = Dimensions.get('window')
const WRatio = win.width

function LoginScreen({navigation, route}){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loggedin, setLoggedin] = useState(false)
    
    const login =async(user)=> {
        try{
        console.log(route.params?.isSeller)
        await userStore.login(user)
        
        navigation.goBack()
        }catch(error){
            console.log(error)
        }
        
    }

    return(
        <View style={{ flex:1, justifyContent: 'center', backgroundColor: '#dddddd'}}>
            <View style={{backgroundColor:'#ffffff', borderRadius:20, padding:20}}>

                <View style={{width:100,height:100, marginLeft:(WRatio-120)/2}}>
                    <Text style={{fontSize:50}}>login</Text>
                </View>

                <View>
                    <View style={{paddingRight: 50}}>
                        <Text style={{fontSize:30, marginTop:20}}>  Name</Text>
                        <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, fontSize:25}}
                        placeholder="Name"
                        onChangeText={(text)=>setName(text)}/>
                    </View>
                    <View style={{paddingRight: 50}}>
                        <Text style={{fontSize:30, marginTop:20}}>  Email</Text>
                        <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, fontSize:25}}
                        placeholder="Email"
                        onChangeText={(text)=>setEmail(text)}
                        textContentType='emailAddress'/>
                    </View>
                    <View style={{paddingRight: 50}}>
                        <Text style={{fontSize:30, marginTop:20}}>  Password</Text>
                        <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, fontSize:25}}
                        placeholder="Password"
                        onChangeText={(text)=>setPassword(text)}
                        textContentType="password"
                        secureTextEntry={true}/>
                    </View>
                    <TouchableOpacity disabled={loggedin} style={{height:60, marginHorizontal:50, backgroundColor:'#3ba8e7', marginTop:40, borderRadius:10, justifyContent:'center', paddingLeft:100,}}
                    onPress={()=> login({name: name, token: "sultan", isSeller: route.params?.isSeller || false})}>
                        <Text style={{fontSize:35, color:'#ffffff'}}>login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen;