import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

const win = Dimensions.get('window')
const WRation = win.width

const ProgressCircleF =()=>{
    return (
        <View style={{height:220, backgroundColor:'#ffffff', borderRadius:10, borderWidth:1, borderColor:'#000000', justifyContent:'center', flexDirection:'row', marginBottom:30}}>
            <View style={{flex:1, justifyContent:'center', padding:20}}>
            <Text style={{fontSize:25}}>your progress for this month is 70%</Text>
            </View>
            <View style={{width:200, padding:10}}>
            <ProgressCircle style={{ height: 200 }} progress={0.7} progressColor={'rgb(134, 65, 244)'} strokeWidth={10}/> 
            </View>

        </View> 
    )
}


export default ProgressCircleF