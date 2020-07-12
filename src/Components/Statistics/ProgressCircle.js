import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'

const win = Dimensions.get('window')
const WRation = win.width

const ProgressCircleF =()=>{
    return (
        <View style={styles.progressCircleContainer}>
            <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>your progress for this month is 70%</Text>
            </View>
            <View style={styles.progressContainer}>
            <ProgressCircle style={{ height: 200 }} progress={0.7} progressColor={'rgb(134, 65, 244)'} strokeWidth={10}/> 
            </View>

        </View> 
    )
}

const styles = StyleSheet.create({
    progressCircleContainer:{
        width:'100%',
        height:250,
        backgroundColor:'#ffffff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000',
        justifyContent:'center',
        flexDirection:'row',
        alignItems:'center',
        marginBottom:30
    },
    progressText:{
        fontSize:25
    },
    progressContainer:{
        height:200,
        width:200,
        padding:10
    },
    progressTextContainer:{
        height:'100%',
        width:WRation-220,
        justifyContent:'center',
        padding:20
    },
})

export default ProgressCircleF