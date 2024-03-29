import React, {useState} from 'react'
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native'
import { StackedBarChart } from 'react-native-svg-charts'
import {Svg ,Rect} from 'react-native-svg'

const StackedBarChartF =()=>{
    const data = [
        {
            month: new Date(2020, 1, 1),
            apples: 3840,
            cherries: 960,
            bananas: 1920,
            dates: 400,
        },
        {
            month: new Date(2020, 2, 1),
            apples: 1600,
            cherries: 960,
            bananas: 1440,
            dates: 400,
        },
        {
            month: new Date(2020, 3, 1),
            apples: 640,
            cherries: 3640,
            bananas: 960,
            dates: 400,
        },
        {
            month: new Date(2020, 4, 1),
            apples: 3320,
            cherries: 640,
            bananas: 480,
            dates: 400,
        },
        {
            month: new Date(2020, 5, 1),
            apples: 3320,
            cherries: 640,
            bananas: 480,
            dates: 400,
        },
        {
            month: new Date(2020, 6, 1),
            apples: 3320,
            cherries: 1800,
            bananas: 2000,
            dates: 2200,
        },
    ]
 
    const colors = ['#47BF6D', '#4BB36F', '#F7EC16', '#CCC745']
    const keys = ['apples', 'cherries', 'bananas', 'dates']
 
    return (
        <View style={{height:280, backgroundColor:'#ffffff', borderRadius:10, borderWidth:1, borderColor:'#000000', padding:5, marginBottom:30}}>
            <Text style={{fontSize:20}}>your selling in the past 6 months</Text>
            <StackedBarChart
                style={{ height: 200 }}
                keys={keys}
                colors={colors}
                data={data}
                showGrid={false}
                contentInset={{ top: 30, bottom: 30 }}
            />
            <View style={{flexDirection:'row'}}>
                <View style={{width:150}}>
                    <View style={{height:20, flexDirection:'row'}}>
                        <Svg>
                            <Rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="#4C9C4B"
                            />
                            <View style={{marginLeft:25}}>
                                <Text style={{fontSize:15}}> apples </Text>
                            </View>
                        </Svg>
                    </View>
                    <View style={{height:20, flexDirection:'row'}}>
                        <Svg>
                            <Rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="#F7EC16"
                            />
                            <View style={{marginLeft:25}}>
                                <Text style={{fontSize:15}}> bananas </Text>
                            </View>
                        </Svg>
                    </View>
                </View>
                <View style={{width:150}}>
                    <View style={{height:20, flexDirection:'row'}}>
                        <Svg>
                            <Rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="#4BB36F"
                            />
                            <View style={{marginLeft:25}}>
                                <Text style={{fontSize:15}}> cherries </Text>
                            </View>
                        </Svg>
                    </View>
                    <View style={{height:20, flexDirection:'row'}}>
                        <Svg>
                            <Rect
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            fill="#CCC745"
                            />
                            <View style={{marginLeft:25}}>
                                <Text style={{fontSize:15}}> dates </Text>
                            </View>
                        </Svg>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default StackedBarChartF