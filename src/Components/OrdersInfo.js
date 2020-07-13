import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function OrdersInfo(props){
    return(
        <View style={{backgroundColor:'#ffffff', paddingHorizontal:10, borderRadius:5, flexDirection:'row', borderColor:'#000000', borderBottomWidth:1, justifyContent:'space-between'}}>

            <View>
                <View style={{marginBottom:20}}>
                    <Text style={{fontSize:25}}>items</Text>
                    <Text style={{fontSize:15}}>  {props.items}....</Text>
                </View>

                <View style={{marginBottom:10}}>
                    <Text style={{fontSize:25}}>Date:
                        <Text style={{fontSize:15}}>{props.date}</Text>
                    </Text>
                </View>
            </View>

            <View style={{justifyContent:'center',}}>
                <Text style={{fontSize:25}}>Price</Text>
                <Text style={{fontSize:15}}>{props.price}</Text>
            </View>

            <TouchableOpacity style={{justifyContent:'center',}}>
                <Text style={{fontSize:25}}>Details</Text>
            </TouchableOpacity>

        </View>
    )
}
