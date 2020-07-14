import React from 'react';
import { Image, View, TouchableOpacity, Text, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import store from '../Mobx/store'
import 'mobx-react-lite/batchingForReactNative'


const SellerItem = ({
    image,
    name,
    price,
    quantity,
    deleteSellerItem
})=>{

    return(
        <View style={{flexDirection:'row', justifyContent:'space-between', borderColor:'#000000', borderBottomWidth:1}}>
            <Image source={{uri:image}} style={{width:150, height:150}}/>
            <View style={{justifyContent:'space-around'}}>
            <Text style={{fontSize:20}}>name: {name}</Text>
            <Text style={{fontSize:20}}>price: {price}</Text>
            <Text style={{fontSize:20}}>quantity: {quantity}</Text>
            </View>
            <TouchableOpacity style={{justifyContent:'center', marginRight:10}}
            onPress={()=> deleteSellerItem(name)}>
                <MaterialIcons name="delete" size={90} color="black" />
            </TouchableOpacity>
        </View>
    )
}


const DeleteItem =observer( ()=>{

    const deleteSellerItem =(name)=> {
        console.log(name)
        store.deleteSellerItem(name)
        console.log(store.renderSellerItems)
    }

    return(
        <View style={{flex:1, backgroundColor:'#ffffff'}}>
            {store.sellerItems.length !==0 ?
            <FlatList
            data={store.sellerItems}
            extraData={store.renderSellerItems}
            renderItem={({ item }) => 
                <SellerItem
                image = {item.imageURI == undefined? '':  item.imageURI}
                name = {item.name}
                price = {item.price}
                quantity = {item.quantity}

                deleteSellerItem={deleteSellerItem}
                />
            }
            keyExtractor={item => item.name}
            />
            :
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:30}}>Empty</Text>
            </View>
            
            }
        </View>
    )
})


export default DeleteItem