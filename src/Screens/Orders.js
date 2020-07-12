import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import OrdersInfo from '../Components/OrdersInfo'
import {dameOrders} from '../../assets/dameData'

const win = Dimensions.get('window');
const WRatio_loginImage = win.width/512


export default function Orders(){

    const [login, setLogin] = useState(false)


    return(
        
        <View style={styles.container}>
            {login?
                <View style={styles.logTContainer}>
                    
                    <FlatList
                    data={dameOrders}
                    renderItem={({ item }) => (
                        <OrdersInfo
                        items={item.items}
                        price={item.price}
                        date={item.date}
                        />
                    )}
                    keyExtractor={item => item.items}
                    />
                    
                    {/* <OrdersInfo
                    items="lettuse, soup"
                    price="198.21"
                    date="2020/7/2"
                    /> */}
                    
                </View>
                :
                <View style={styles.logfContainer}>
                    <Image
                    source={require('../../assets/loginImage.png')}
                    style={styles.loginImage}
                    />
                    <Text style={styles.fristTextF}>your are not logged in yet</Text>
                    <Text style={styles.seconcdText}>Please login to see and track your Orders</Text>
                    <TouchableOpacity
                    style={styles.loginButton}
                    onPress={()=>setLogin(true)}>
                        <Text style={styles.buttonText}>login</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
    },
    logTContainer:{
        width:'100%',
        height:'100%',
    },
    logfContainer:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    loginImage:{
        width:'50%',
        height:WRatio_loginImage*512/2
    },
   fristTextF:{
       margin:10,
       fontSize:30
   },
   seconcdText:{
       fontSize:20,
       margin:5
   },
   loginButton:{
       width:'90%',
       height:60,
       backgroundColor:'#3ba8e7',
       borderRadius:10,
       margin:15,
       justifyContent:'center',
       alignItems:'center'
   },
   buttonText:{
       fontSize:35,
       color:'#ffffff'
   } 
})