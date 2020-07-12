import React, {useEffect, useState} from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput, FlatList } from 'react-native';
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'
import SellerItem from '../Components/sellerItem'
import { Observer ,observer } from 'mobx-react'


const DeleteItem = observer( ()=>{


    return(
        <View style={styles.container}>
            {store.sellerItems.length !==0 ?
            <FlatList
            data={store.sellerItems}
            renderItem={({ item }) => (<Observer>{()=>
                <SellerItem
                image = {item.imageURI == undefined? '':  item.imageURI}
                name = {item.name}
                price = {item.price}
                quantity = {item.quantity}
                />
                }</Observer>
            )}
            keyExtractor={item => item.name}
            />
            :
            <View style={styles.textContainer}>
                <Text style={styles.text}>Empty</Text>
            </View>
            
            }
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff'
    },
    image:{
        width:200,
        height:200
    },
    textContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:30
    }
})

export default DeleteItem