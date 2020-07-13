import React from 'react';
import { Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons } from '@expo/vector-icons';
// import {connect} from 'react-redux'
// import {addItem, plusItem, minusItem, deleteItem, changeStatus} from '../Redux/Action'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'

const win = Dimensions.get('window')
const WRation = win.width
const itemWidht = WRation/2

const ItenShort=observer (({name, id, price, pieces, select})=> {

    

    return(
        <View style={{flex:1, marginBottom:10}}>
            <View style={{width:itemWidht*0.75, height:itemWidht*0.75, backgroundColor:'#d3d3d3', marginHorizontal:itemWidht*0.25/2}}>
    
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, marginVertical:5}}>
                <Text style={{fontSize:23}}>{name}</Text>
                <Text style={{fontSize:23}}>{price} SR</Text>
            </View>
            {select?

            <View style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'space-around', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}>
                <TouchableOpacity
                onPress={()=>store.plus(id)}>
                    <Entypo name="plus" size={35} color="black" />
                </TouchableOpacity>
                <Text style={{fontSize:30, color:'#33dd33'}}>{pieces}</Text>

                {pieces === 1?

                <TouchableOpacity
                onPress={()=> store.delete(id)}>
                    <MaterialIcons name="delete" size={35} color="black" />
                </TouchableOpacity>

                :

                <TouchableOpacity
                onPress={()=>store.minus(id)}>
                    <Entypo name="minus" size={35} color="black" />
                </TouchableOpacity>

                }
            </View>

            :

            <TouchableOpacity style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}
            onPress={()=>store.select(id)}>
                <Text style={{fontSize:25, color:'#33dd33'}}>add </Text>
                <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
            </TouchableOpacity>

            }
            
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
//       add: (item) => dispatch(addItem(item)),
//       plus: (id) => dispatch(plusItem(id)),
//       minus: (id) => dispatch(minusItem(id)),
//       delete: (id) => dispatch(deleteItem(id)),
//       change: (id) => dispatch(changeStatus(id))
//     }
//   }  

export default ItenShort;