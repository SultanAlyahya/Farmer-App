import React, {useState} from 'react'
import { ScrollView, Text, View } from 'react-native'
import { StackedBarChart, ProgressCircle, PieChart } from 'react-native-svg-charts'
import {Svg ,Rect} from 'react-native-svg'



const PieChartComponent =()=>{

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


const ProgressCircleComponent =()=>{
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


const StackedBarChartComponent =()=>{
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

 
const Statistics =()=>{

    return (
        <ScrollView style={{flex:1, paddingHorizontal:5}}>
            <StackedBarChartComponent/>
            <ProgressCircleComponent/>
            <PieChartComponent/>
        </ScrollView>
    )
    
}


export default Statistics