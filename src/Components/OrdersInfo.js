import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default function OrdersInfo(props){
    return(
        <View style={styles.container}>

            <View style={styles.itemsSections}>
                <View style={styles.itemsContainer}>
                    <Text style={styles.lable}>items</Text>
                    <Text style={styles.text}>  {props.items}....</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.lable}>Date:
                        <Text style={styles.text}>{props.date}</Text>
                    </Text>
                </View>
            </View>

            <View style={styles.priceSection}>
                <Text style={styles.lable}>Price</Text>
                <Text style={styles.text}>{props.price}</Text>
            </View>

            <TouchableOpacity style={styles.detailsContainer}>
                <Text style={styles.lable}>Details</Text>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:100,
        backgroundColor:'#ffffff',
        padding:5,
        borderRadius:5,
        flexDirection:'row',
        borderColor:'#000000',
        borderBottomWidth:1,

    },
    itemsContainer:{
        width:'100%',
        height:60
    },
    lable:{
        fontSize:25
    },
    text:{
        fontSize:15
    },
    itemsSections:{
        height:'100%',
        width:'40%'
    },
    dateContainer:{
        height:40,
        width:'100%',
        justifyContent:'flex-start',
    },
    priceSection:{
        height:'100%',
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    },
    detailsContainer:{
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        width:'30%'
    }
})