import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
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
        <View style={styles.container}>
            <View style={styles.imageContainer}>
    
            </View>
            <View style={styles.itemNameContrainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.name}>{price} SR</Text>
            </View>
            {select?

            <View style={{...styles.addButton,justifyContent:'space-around'}}>
                <TouchableOpacity
                onPress={()=>store.plus(id)}>
                    <Entypo name="plus" size={35} color="black" />
                </TouchableOpacity>
                <Text style={styles.buttonText}>{pieces}</Text>

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

            <TouchableOpacity style={styles.addButton}
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
        width:itemWidht,
        height:itemWidht+50,
        //backgroundColor:'#444444',
        alignItems:'center',
        marginBottom:10
    },
    imageContainer:{
        width:itemWidht*0.75,
        height:itemWidht*0.75,
        backgroundColor:'#d3d3d3'
    },
    info:{
        width:'100%',
        height:'25%',
    },
    addButton:{
        width:'100%',
        height:'25%',
    },
    itemNameContrainer:{
        width:'90%',
        height:itemWidht*0.25,
        justifyContent:'space-between',
        //backgroundColor:'#d3d3d3'.
        flexDirection:'row',
        alignItems:'center'
    },
    name:{
        fontSize:23
    },
    addButton:{
        width:'95%',
        height:50,
        //backgroundColor:'#33dd33',
        borderRadius:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'#33dd33'
    },
    buttonText:{
        fontSize:25,
        color:'#33dd33'
    },
    sign:{
        width:50,
        height:50
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

export default ItenShort;