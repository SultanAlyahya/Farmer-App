import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions } from 'react-native'
import { PieChart } from 'react-native-svg-charts'
import {Svg ,Rect} from 'react-native-svg'

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
        <View style={{height:300,backgroundColor:'#ffffff',borderRadius:10,borderWidth:1,borderColor:'#000000',}}>
            <View style={{flex:1, flexDirection:'row'}}>
                <View style={{width:230, justifyContent:'center'}}>
                    <PieChart 
                    style={{ height: 200 }} 
                    data={pieData}
                    innerRadius={'0%'}
                    />
                </View>
                <View style={{flex:1,justifyContent:'center', paddingLeft:20}}>
                    <View style={{justifyContent:'center', marginVertical:30}}>
                        <Text style={{fontSize:25}}>selling this month</Text>
                    </View>
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#4C9C4B"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text> apples </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#F7EC16"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text> bananas </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#4BB36F"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text> cherries </Text>
                                </View>
                            </Svg>
                        </View>
                        <View style={{flexDirection:'row', marginVertical:5}}>
                            <Svg>
                                <Rect
                                x="0"
                                y="0"
                                width="20"
                                height="20"
                                fill="#CCC745"
                                />
                                <View style={{marginLeft:25}}>
                                    <Text> dates </Text>
                                </View>
                            </Svg>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{marginVertical:10}}>
                <Text style={{fontSize:25}}>Press on Pie Chart:   {pie || 0} sold items</Text>
            </View>
        </View>
    )
}


export default PieChartF