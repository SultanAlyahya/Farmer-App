import React from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { Observer, observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'

const ItemsInCart= observer( (props)=>{

    return(
        <View style={{flex:1, backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderColor:'#000000'}}>
            <View style={{width:100, height:100, backgroundColor:'#333333'}}>

            </View>

            <View style={{padding:10, justifyContent:'space-around'}}>
                <Text style={{fontSize:20}}>{props.name}</Text>
                <Text>price:{"\n"}{props.price*store.list[props.index].pieces} SR</Text>
            </View>

            <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>

                <TouchableOpacity styles={{width:50, height:50}}
                onPress={()=> store.plus(props.id)}>
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>

                <Text style={{fontSize:50}}>{props.pieces}</Text>

                <TouchableOpacity styles={{width:50, height:50}}
                onPress={()=> store.minus(props.id)}>
                    <Entypo name="minus" size={50} color="black" />
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{marginHorizontal:10, marginTop:25}}
            onPress={()=> store.delete(props.id)}>
                <MaterialIcons name="delete" size={50} color="black" />
            </TouchableOpacity>

        </View>
    )
})

const CartScreen=()=>{
   
    return(
        <View style={{flex: 1}}>
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
    
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%'
    },
})

// const mapStateToProps=(state)=>{
//     return{
//         items: state.itemReducer.items
//     }
// }

export default CartScreen;