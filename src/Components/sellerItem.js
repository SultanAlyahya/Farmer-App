import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
// import {connect} from 'react-redux'
// import {addItem, plusItem, minusItem, deleteItem, changeStatus} from '../Redux/Action'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'


const SellerItem = ({image, name, price, quantity})=>{

    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', borderColor:'#000000', borderBottomWidth:1}}>
            <Image source={{uri:image}} style={{width:150, height:150}}/>
            <View style={{justifyContent:'space-around'}}>
            <Text style={{fontSize:20}}>name: {name}</Text>
            <Text style={{fontSize:20}}>price: {price}</Text>
            <Text style={{fontSize:20}}>quantity: {quantity}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center', marginRight:10}}
            onPress={()=> store.deleteSellerItem(name)}>
                <MaterialIcons name="delete" size={90} color="black" />
            </TouchableOpacity>
        </View>
    )
}


export default SellerItem