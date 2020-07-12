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
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.price}>Price: {price} SR</Text>
            </View>
            {select?
            <View style={styles.addButton}>
                <TouchableOpacity style={styles.sign}
                onPress={()=>store.plus(id)}>
                    <Entypo name="plus" size={35} color="black" />
                </TouchableOpacity>
                <Text style={{...styles.buttonText, justifyContent:'space-between'}}>{pieces}</Text>

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
            style={styles.addButton}
            onPress={()=>store.select(id)}>
                <Text style={styles.buttonText}>add </Text>
                <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
            </TouchableOpacity>
            }
            
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        width:WRation,
        height:itemHight,
        //backgroundColor:'#444444',
        //alignItems:'center',
        margin:5,
        flexDirection:'row',
        justifyContent:'space-between',
    },
    imageContainer:{
        width:itemHight,
        height:itemHight,
        backgroundColor:'#d3d3d3'
    },
    infoContainer:{
        height:'100%',
        width:WRation-(itemHight*2)+10,
        //backgroundColor:'#aaaaaa',
        justifyContent:'space-around',
        alignItems:'center'
    },
    addButton:{
        width:itemHight-10,
        height:itemHight,
        borderRadius:5,
        
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#33dd33'
    },
    price:{
        fontSize:20
    },
    name:{
        fontSize:25
    },
    buttonText:{
        fontSize:30,
        color:'#33dd33'
    },
    sign:{
        width:35,
        height:35
    }

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