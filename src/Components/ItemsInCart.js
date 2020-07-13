import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
// import {connect} from 'react-redux';
// import {plusItem, minusItem, deleteItem} from '../Redux/Action'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'

const win = Dimensions.get('window')
const RWidth = win.width
const extraWidth = RWidth-150


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

// const mapStateToProps =(state)=>{
//     //console.log(state.itemReducer.items)
//     return{
//         items: state.itemReducer.items
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//       plus: (id) => dispatch(plusItem(id)),
//       minus: (id) => dispatch(minusItem(id)),
//       delete: (id) => dispatch(deleteItem(id))
//     }
//   }  


export default ItemsInCart;