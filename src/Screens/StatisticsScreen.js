import React, {useState} from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import PieChartF from '../Components/Statistics/PieChart'
import ProgressCircleF from '../Components/Statistics/ProgressCircle'
import StackedBarChartF from '../Components/Statistics/StackedBarChartF'

 
const Statistics =()=>{

    return (
        <ScrollView style={styles.cintainer}>
            <StackedBarChartF/>
            <ProgressCircleF/>
            <PieChartF/>
        </ScrollView>
    )
    
}

const styles = StyleSheet.create({
    cintainer:{
        flex:1,
        padding:5
    },
    StackedBarChartContainer:{
        height:280,
        width:'100%',
        padding:5,
        backgroundColor:'#ffffff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000',
        marginBottom:30
    },
})

export default Statistics