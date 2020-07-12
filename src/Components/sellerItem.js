import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
// import {connect} from 'react-redux'
// import {addItem, plusItem, minusItem, deleteItem, changeStatus} from '../Redux/Action'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'


const SellerItem = ({image, name, price, quantity})=>{

    useEffect(()=>{
        //console.log(name+" "+price+" "+quantity)
    },[])

    return(
        <View style={styles.container}>
            <Image source={{uri:image}} style={styles.image}/>
            <View style={styles.infoContainer}>
            <Text style={styles.info}>name: {name}</Text>
            <Text style={styles.info}>price: {price}</Text>
            <Text style={styles.info}>quantity: {quantity}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton}
            onPress={()=> store.deleteSellerItem(name)}>
                <MaterialIcons name="delete" size={90} color="black" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:150,
        flexDirection:'row',
        borderColor:'#000000',
        borderBottomWidth:1,
        justifyContent:'space-between'
        
    },
    image:{
        width:150,
        height:150
    },
    infoContainer:{
        //backgroundColor:'#555555',
        justifyContent:'space-around'
    },
    deleteButton:{
        width:100,
        height:'100%',
        //backgroundColor:'#555555',
        justifyContent:'center',
        alignItems:'center'
    },
    info:{
        fontSize:20
    }
})

export default SellerItem