import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
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
        <View style={styles.container}>
            <View style={styles.image}>

            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{props.name}</Text>
                <Text>price:{"\n"}{props.price*store.list[props.index].pieces} SR</Text>
            </View>

            <View style={styles.itemNum}>
                <TouchableOpacity styles={styles.sign}
                onPress={()=> store.plus(props.id)}>
                    <Entypo name="plus" size={50} color="black" />
                </TouchableOpacity>
                <Text style={styles.num}>{props.pieces}</Text>
                <TouchableOpacity styles={styles.sign}
                onPress={()=> store.minus(props.id)}>
                    <Entypo name="minus" size={50} color="black" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.delete}
            onPress={()=> store.delete(props.id)}>
                <MaterialIcons name="delete" size={50} color="black" />
            </TouchableOpacity>

        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:100,
        backgroundColor:'#ffffff',
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth:1,
        borderColor:'#000000'
    },
    image:{
        width:100,
        height:100,
        backgroundColor:'#333333'
    },
    delete:{
        width:50,
        height:50,
        marginHorizontal:10,
        marginTop:25,
        //backgroundColor:'#353535'
    },
    info:{
        height:'100%',
        width:extraWidth*0.4,
        //backgroundColor:'#aaaaaa',
        padding:10,
        justifyContent:'space-around',
    },
    itemNum:{
        height:'100%',
        width:extraWidth*0.6,
        //backgroundColor:'#777777',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },
    name:{
        fontSize:20
    },
    sign:{
        width:50,
        height:50
    },
    num:{
        fontSize:50
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
//       plus: (id) => dispatch(plusItem(id)),
//       minus: (id) => dispatch(minusItem(id)),
//       delete: (id) => dispatch(deleteItem(id))
//     }
//   }  


export default ItemsInCart;