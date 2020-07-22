import React from 'react'
import { View, ImageBackground, TouchableOpacity, Text } from 'react-native'
import store from '../Mobx/store'

const WelcomeScreen =({navigation})=> {
    return(
        <View style={{flex:1}}>
            <ImageBackground
            style={{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'}}
            source={require('../../assets/fruits-farmerApp.gif')}>

                <TouchableOpacity style={{padding:20, backgroundColor: '#33bb33', borderWidth: 1, borderColor: '#000000', borderRadius:5 }}
                onPress={()=> navigation.replace("tabNavigation")}>
                    <Text style={{fontSize:30}}>shop</Text>
                </TouchableOpacity>

            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen