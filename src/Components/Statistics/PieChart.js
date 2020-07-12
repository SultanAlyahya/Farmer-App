import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import {Svg ,Rect} from 'react-native-svg'

const win = Dimensions.get('window')
const WRation = win.width

const PieChartF =()=>{

    const [pie, setPie] = useState('')

    const data = [50, 10, 40]

    const randomColor = ['#345567', '#ab4388', '#aaff00']

    const pieData = [
        {value:3320, svg:{fill:'#47BF6D', onPress:()=> setPie('3320')}, key: `pie-${1}`},
        {value:2000, svg:{fill:'#4BB36F', onPress:()=> setPie('2000')}, key: `pie-${2}`},
        {value:1800, svg:{fill:'#F7EC16', onPress:()=> setPie('1800')}, key: `pie-${3}`},
        {value:2200, svg:{fill:'#CCC745', onPress:()=> setPie('2200')}, key: `pie-${4}`}
    ]

    return(
        <View style={styles.pieChartContainer}>
            <View style={styles.pieInfoTextContainer}>
                <View style={styles.pieCobtainer}>
                    <PieChart 
                    style={{ height: 200 }} 
                    data={pieData}
                    innerRadius={'0%'}
                    />
                </View>
                <View style={styles.pieInfoContainer}>
                    <View style={styles.pieTextContainer}>
                    <Text style={styles.pieText}>selling this month</Text>
                    </View>
                    <View style={styles.pieItems}>
                        <View style={styles.item}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#4C9C4B"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text style={styles.itemName}> apples </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={styles.item}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#F7EC16"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text style={styles.itemName}> bananas </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={styles.item}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#4BB36F"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text style={styles.itemName}> cherries </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={styles.item}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#CCC745"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text style={styles.itemName}> dates </Text>
                                </View>
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.pieDisplay}>
                <Text>Press on color in Pie Chart to have the selling number: {pie}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pieChartContainer:{
        width:'100%',
        height:290,
        backgroundColor:'#ffffff',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000',
        //flexDirection:'row'
    },
    pieCobtainer:{
        height:250,
        width:220,
        justifyContent:'center'
    },
    pieInfoContainer:{
        height:250,
        width:WRation-230,
        justifyContent:'center',
        padding:20
    },
    pieTextContainer:{
        height:'50%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        //backgroundColor:'#d3d3d3'
    },
    pieText:{
        fontSize:25
    },
    pieItems:{
        height:'50%',
        width:'100%',
        //backgroundColor:'#d3d3d3',
        justifyContent:'space-around'
        
    },
    pieItemStack:{
        width:'50%',
        height:'100%'
    },
    pieDisplay:{
        height:30,
        width:'100%',
        //backgroundColor:'#3d3d3d'
    },
    pieInfoTextContainer:{
        height:250,
        width:'100%',
        flexDirection:'row'
    },
    item:{
        height:20,
        width:'100%',
        //backgroundColor:'#d3d3d3',
        flexDirection:'row'
    },
})

export default PieChartF