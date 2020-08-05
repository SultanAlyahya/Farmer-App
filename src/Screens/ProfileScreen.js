import React, {useEffect} from 'react';
import { Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import userStore from '../Mobx/userStore'
import store from '../Mobx/store';



const win = Dimensions.get('window')
const WRatio = win.width


const ProfileScreen =observer (({navigation})=> {

    useEffect(()=>{
        console.log(userStore.isSeller)
    })

    const logout =async()=>{
        try{
            await userStore.logout()
        }catch(error){
            console.log(error)
        }
    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff',}}>
            <View style={{width:'100%', height:200, backgroundColor:'#3ba8e7', position:'absolute',}}></View>
            <View style={{width:150, height:150, borderRadius:360, backgroundColor:'#ffffff', marginHorizontal:(WRatio-150)/2, marginTop:25}}>
            <Image
                style={{width:'100%', height:'100%'}}
                source={require('../../assets/loginImage.png')}
            />
            </View>
            {userStore.getToken === ""?
            <View style={{flex:1}}>
            
            

            <Text style={{margin:25, fontSize:30}}>your are not logged in yet</Text>

            <TouchableOpacity
                style={{width:300, height:60, backgroundColor:'#3ba8e7', borderRadius:10, margin:15, justifyContent:'center', marginHorizontal:(WRatio-300)/2, paddingLeft:130}}
                onPress={()=> navigation.navigate('login', {isSeller: false})}>
                    <Text style={{fontSize:20, color:'#ffffff'}}>login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{width:300, height:60, backgroundColor:'#3ba8e7', borderRadius:10, margin:15, justifyContent:'center', marginHorizontal:(WRatio-300)/2, paddingLeft:90}}
                onPress={()=> navigation.navigate('login', {isSeller: true})}>
                    <Text style={{fontSize:20, color:'#ffffff'}}>login as seller</Text>
            </TouchableOpacity>
            </View>
            :
            <>

                <View style={{flex:1, marginTop:25, backgroundColor:'#ffffff',}}>
                <ScrollView style={{flex:1}}>
                    
                    <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}>
                        <Text style={{fontSize:20, marginLeft:10}}>Profile info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}>
                        <Text style={{fontSize:20, marginLeft:10}}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}>
                        <Text style={{fontSize:20, marginLeft:10}}>Billing info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}>
                    <Text style={{fontSize:20, marginLeft:10}}>Edit location</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}
                    onPress={()=> navigation.navigate('help')}>
                    <Text style={{fontSize:20, marginLeft:10}}>Help</Text>
                    </TouchableOpacity>
                    

                    {userStore.isSeller?

                    <>
                        <Text style={{fontSize:25, margin:20}}>seller section</Text>

                        <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}>
                            <Text style={{fontSize:20, marginLeft:10}}>seller info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}
                        onPress={()=> navigation.navigate('addItem')}>
                            <Text style={{fontSize:20, marginLeft:10}}>add item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}
                        onPress={()=> navigation.navigate('statistics')}>
                            <Text style={{fontSize:20, marginLeft:10}}>Statistics</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{height:60, borderBottomWidth:1, borderColor:'#000000', justifyContent:'center'}}
                        onPress={()=> navigation.navigate('deleteItem')}>
                        <Text style={{fontSize:20, marginLeft:10}}>delete item</Text>
                        </TouchableOpacity>
                        
                        
                    </>

                    :
                    <>
                    </>
                    }
                    <TouchableOpacity style={{height:70, width:300, borderColor:'#000000', borderWidth:1, justifyContent:'center', marginTop:20, marginHorizontal:(WRatio-300)/2, backgroundColor:'#3ba8e7', paddingLeft:100}}
                        onPress={()=> logout()}>
                            <Text style={{fontSize:30, color:'#ffffff'}}>logout</Text>
                    </TouchableOpacity>
                </ScrollView>
                </View>
            </>
            }
        </View>
    )
})


export default ProfileScreen;