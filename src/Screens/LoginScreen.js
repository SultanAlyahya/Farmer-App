import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const win = Dimensions.get('window')
const WRatio = win.width

function LoginScreen({navigation}){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return(
        <View style={{ flex:1, justifyContent: 'center', backgroundColor: '#dddddd'}}>
            <View style={{backgroundColor:'#ffffff', borderRadius:20, padding:20}}>

                <View style={{width:100,height:100, marginLeft:(WRatio-120)/2}}>
                    <Text style={{fontSize:50}}>login</Text>
                </View>

                <View>
                    <Text style={{fontSize:30, marginTop:20}}>  Name</Text>
                    <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, marginRight:50, fontSize:25}}
                    placeholder="Name"
                    onChangeText={(text)=>setName(text)}/>

                    <Text style={{fontSize:30, marginTop:20}}>  Email</Text>
                    <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, marginRight:50, fontSize:25}}
                    placeholder="Email"
                    onChangeText={(text)=>setEmail(text)}
                    textContentType='emailAddress'/>

                    <Text style={{fontSize:30, marginTop:20}}>  Password</Text>
                    <TextInput style={{height:50, backgroundColor:'#f3f3f3', borderRadius:20, borderWidth:1, borderColor:'#000000', paddingLeft:5, marginRight:50, fontSize:25}}
                    placeholder="Password"
                    onChangeText={(text)=>setPassword(text)}
                    textContentType="password"
                    secureTextEntry={true}/>

                    <TouchableOpacity style={{height:60, marginHorizontal:50, backgroundColor:'#3ba8e7', marginTop:40, borderRadius:10, justifyContent:'center', paddingLeft:100,}}
                    onPress={()=> navigation.navigate('profile')}>
                        <Text style={{fontSize:35, color:'#ffffff'}}>login</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default LoginScreen;