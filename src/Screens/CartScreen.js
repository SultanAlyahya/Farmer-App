import React from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import store from '../Mobx/store'
import 'mobx-react-lite/batchingForReactNative'

const ItemsInCart= ({
    name,
    price,
    id,
    pieces,
    deleteProductFormCart,
    increaseProductItems,
    decreaseProductItems
})=> {

    return(
        <View style={{backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderColor:'#000000'}}>
            <View style={{width:100, height:100, backgroundColor:'#333333'}}>

            </View>

            <View style={{padding:10, justifyContent:'space-around'}}>
                <Text style={{fontSize:20}}>{name}</Text>
                <Text>price:{"\n"}{price*pieces} SR</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>

                <TouchableOpacity styles={{width:50, height:50}}
                onPress={()=> increaseProductItems(id)}>
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>

                <Text style={{fontSize:50}}>{pieces}</Text>

                <TouchableOpacity styles={{width:50, height:50}}
                onPress={()=> decreaseProductItems(id)}>
                    <Entypo name="minus" size={50} color="black" />
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{marginHorizontal:10, marginTop:25}}
            onPress={()=> deleteProductFormCart(id)}>
                <MaterialIcons name="delete" size={50} color="black" />
            </TouchableOpacity>

        </View>
    )
}

const CartScreen=observer( ()=>{

    const deleteProductFormCart =(id)=> {
        store.deleteProductFormCart(id)
    }
    
    const increaseProductItems =(id)=> {
        store.increaseProductItems(id)
    }
    
    const decreaseProductItems =(id)=> {
        store.decreaseProductItems(id)
    }
    
   
    return(
        <View style={{flex: 1}}>
            <FlatList
            data={store.getProducts}
            extraData={store.renderSection}
            renderItem={({item,index})=>
            item.select?
            
                <ItemsInCart
                name={item.name}
                price={item.price}
                id={item.id}
                pieces={item.pieces}
                index={index}

                deleteProductFormCart={deleteProductFormCart}
                increaseProductItems={increaseProductItems}
                decreaseProductItems={decreaseProductItems}
                />
            
            :
                <View></View>
           
            }
            keyExtractor={item=> item.name+""+item.price}
            />
        </View>
    )
    
})


export default CartScreen;