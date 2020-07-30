import React, { useState } from 'react';
import { Text, View, Image, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import {testOrders} from '../../assets/testData'
import {observer} from 'mobx-react'
import userStore from '../Mobx/userStore'
import 'mobx-react-lite/batchingForReactNative'

const win = Dimensions.get('window');
const WRatio_loginImage = win.width/512
const WRatio = win.width
const imageSize = WRatio_loginImage*512/2


const OrdersInfo =({
    items,
    price,
    date
})=>{
    return(
        <View style={{backgroundColor:'#ffffff', paddingHorizontal:10, borderRadius:5, flexDirection:'row', borderColor:'#000000', borderBottomWidth:1, justifyContent:'space-between'}}>

            <View>
                <View style={{marginBottom:20}}>
                    <Text style={{fontSize:25}}>items</Text>
                    <Text style={{fontSize:15}}>  {items}....</Text>
                </View>

                <View style={{marginBottom:10}}>
                    <Text style={{fontSize:25}}>Date:
                        <Text style={{fontSize:15}}>{date}</Text>
                    </Text>
                </View>
            </View>

            <View style={{justifyContent:'center',}}>
                <Text style={{fontSize:25}}>Price</Text>
                <Text style={{fontSize:15}}>{price}</Text>
            </View>

            <TouchableOpacity style={{justifyContent:'center',}}>
                <Text style={{fontSize:25}}>Details</Text>
            </TouchableOpacity>

        </View>
    )
}


const OrderScreen =observer( ({navigation})=> {


    return(
        
        <View style={{flex: 1}}>
            <View style={{justifyContent: 'center', flexDirection: 'row', padding: 20, paddingTop: 40, backgroundColor: '#3d3'}}>
                <Text style={{fontSize: 30}}>Orders</Text>
            </View>
            {userStore.token !== ''?
                <View>
                    
                    <FlatList
                    data={testOrders}
                    renderItem={({ item }) => (
                        <OrdersInfo
                        items={item.items}
                        price={item.price}
                        date={item.date}
                        />
                    )}
                    keyExtractor={item => item.id}
                    />
                     
                </View>
                :
                <View style={{flex:1, justifyContent:'center'}}>
                    <Image
                    source={require('../../assets/loginImage.png')}
                    style={{width:imageSize, height:imageSize, marginLeft:(WRatio-imageSize)/2}}
                    />

                    <View style={{alignItems:'center'}}>
                        <Text style={{margin:10, fontSize:30}}>your are not logged in yet</Text>
                        <Text style={{fontSize:20, margin:5}}>Please login to see and track your Orders</Text>
                    </View>

                    <TouchableOpacity
                    style={{ height:60, backgroundColor:'#3ba8e7', borderRadius:10, margin:20, justifyContent:'center', paddingLeft:(WRatio-100)/2}}
                    onPress={()=> navigation.navigate('login', {isSeller: false})}>
                        <Text style={{fontSize:35, color:'#ffffff'}}>login</Text>
                    </TouchableOpacity>

                </View>
            }
        </View>
    )
})

export default OrderScreen