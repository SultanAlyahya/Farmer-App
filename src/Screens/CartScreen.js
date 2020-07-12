import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
//import {connect} from 'react-redux'
import ItemsInCart from '../Components/ItemsInCart'
import { Observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'

const CartScreen=()=>{
    

        return(
        <View style={styles.container}>
        <FlatList
        data={store.list}
        renderItem={({item,index})=>(<Observer>{()=>
            item.select?
            
            <ItemsInCart
            name={item.name}
            price={item.price}
            id={item.id}
            pieces={item.pieces}
            index={index}
            />
            
            :
            <View></View>
        }</Observer>
        )}
        keyExtractor={item=> item.name+""+item.price}
        />
        </View>
        )
        // <TouchableOpacity style={{width:400, height:200, backgroundColor:'black'}}
        // onPress={()=>console.log(props.items)}/>
        
    
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
    items:{
        width:'100%',
        height:100,
    }
})

// const mapStateToProps=(state)=>{
//     return{
//         items: state.itemReducer.items
//     }
// }

export default CartScreen;