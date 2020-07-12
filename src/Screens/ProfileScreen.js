import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'



const win = Dimensions.get('window')
const WRatio = win.width
const HRatio = win.height
const WRatio_loginImage = win.width/512

const ProfileScreen =observer (({navigation})=> {
    return(
        <View style={styles.container}>
            <View style={styles.blueBackbround}></View>
            {store.token !== "none"?
            <>
            
            <View style={styles.imageContainer}>
            <Image
                source={require('../../assets/loginImage.png')}
                style={styles.loginImage}
            />
            </View>

            <Text style={styles.fristTextF}>your are not logged in yet</Text>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={()=> navigation.navigate('login')}>
                    <Text style={styles.buttonText}>login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.loginButton}
                onPress={()=> navigation.navigate('login')}>
                    <Text style={styles.buttonText}>login as seller</Text>
            </TouchableOpacity>
            </>
            :
            <>
                <View style={styles.imageContainerToekn}>
                <Image
                source={require('../../assets/loginImage.png')}
                style={styles.loginImage}
                />
                </View>
                <View style={styles.settingsContainer}>
                <ScrollView contentContainerStyle={styles.settings}>
                    
                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.buttonText}>Profile info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.buttonText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsButton}>
                        <Text style={styles.buttonText}>Billing info</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.settingsButton}>
                    <Text style={styles.buttonText}>Edit location</Text>
                    </TouchableOpacity>

                    {store.isSeller?

                    <>
                        <Text style={styles.labels}>seller section</Text>

                        <TouchableOpacity style={styles.settingsButton}>
                            <Text style={styles.buttonText}>seller info</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsButton}
                        onPress={()=> navigation.navigate('addItem')}>
                            <Text style={styles.buttonText}>add item</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsButton}
                        onPress={()=> navigation.navigate('statistics')}>
                            <Text style={styles.buttonText}>Statistics</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingsButton}
                        onPress={()=> navigation.navigate('deleteItem')}>
                        <Text style={styles.buttonText}>delete item</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.logoutButton}>
                            <Text style={styles.logoutText}>logout</Text>
                        </TouchableOpacity>
                    </>

                    :
                    <>
                    </>
                    }
                </ScrollView>
                </View>
            </>
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        alignItems:'center',
        margin:0
    },
    blueBackbround:{
        width:WRatio,
        height:WRatio/2,
        backgroundColor:'#3ba8e7',
        position:'absolute',
        zIndex:0,
    },
    loginImage:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:WRatio_loginImage*512/2,
        height:WRatio_loginImage*512/2,
        borderRadius:360,
        backgroundColor:'#ffffff',
        //marginHorizontal:WRatio_loginImage*512/4,
        marginTop:WRatio_loginImage*512/4
    },
    fristTextF:{
        margin:10,
        fontSize:30
    },
    loginButton:{
        width:'90%',
        height:60,
        backgroundColor:'#3ba8e7',
        borderRadius:10,
        margin:15,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:35,
        color:'#ffffff'
    },
    imageContainerToekn:{
        width:WRatio_loginImage*512/3,
        height:WRatio_loginImage*512/3,
        borderRadius:360,
        backgroundColor:'#ffffff',
       marginTop:WRatio_loginImage*512/12,
    },
    settings:{
       width:WRatio,
       height: store.isSeller? WRatio*2 : 240,
       //marginTop:WRatio_loginImage*512/12,
       //backgroundColor:'#ffffff',
       alignItems:'center'
    },
    settingsButton:{
        width:'100%',
        height:60,
        //backgroundColor:'#ffffff',
        borderBottomWidth:1,
        borderColor:'#000000',
        justifyContent:'center'
    },
    buttonText:{
        fontSize:20,
        marginLeft:10
    },
    labels:{
        fontSize:25,
        margin:20
    },
    logoutButton:{
        height:70,
        width:'80%',
        borderColor:'#000000',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        marginTop:20,
        backgroundColor:'#3ba8e7'
    },
    settingsContainer:{
       width:'100%',
       height:HRatio-WRatio/2,
       marginTop:WRatio_loginImage*512/12,
       backgroundColor:'#ffffff',
    },
    logoutText:{
        fontSize:30,
        color:'#ffffff'
    }
})

export default ProfileScreen;