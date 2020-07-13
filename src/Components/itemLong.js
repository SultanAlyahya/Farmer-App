import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import {connect} from 'react-redux'
// import {addItem, plusItem, minusItem, deleteItem, changeStatus} from '../Redux/Action'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'



const win = Dimensions.get('window')
const WRation = win.width
const itemHight = WRation/3

const ItenLong= observer( ({name, id, price, pieces, select})=>{
    return(
        <View style={{flex:1, marginBottom:5, flexDirection:'row', justifyContent:'space-between',}}>
            <View style={{width:150, height:150, backgroundColor:'#d3d3d3'}}>
                
            </View>
            <View style={{justifyContent:'space-around', alignItems:'center'}}>
                <Text style={{fontSize:25}}>{name}</Text>
                <Text style={{fontSize:20}}>Price: {price} SR</Text>
            </View>
            {select?
            <View style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30}}>
                <TouchableOpacity style={styles.sign}
                onPress={()=>store.plus(id)}>
                    <Entypo name="plus" size={35} color="black" />
                </TouchableOpacity>
                <Text style={{fontSize:30, color:'#33dd33'}}> {pieces}</Text>

                {pieces === 1?
                <TouchableOpacity
                onPress={()=> store.delete(id)}>
                    <MaterialIcons name="delete" size={35} color="black" />
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.sign}
                onPress={()=>store.minus(id)}>
                    <Entypo name="minus" size={35} color="black" />
                </TouchableOpacity>
                }
            </View>
            :
            <TouchableOpacity
            style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30}}
            onPress={()=>store.select(id)}>
                <Text style={{fontSize:30, color:'#33dd33'}}>add </Text>
                <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
            </TouchableOpacity>
            }
            
        </View>
    )
})

const styles = StyleSheet.create({
    
   
    
    


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


export default ItenLong;