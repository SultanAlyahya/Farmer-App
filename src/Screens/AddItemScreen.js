import React, {useEffect, useState} from 'react';
import { Image, View, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'

const win = Dimensions.get('window')
const HRation = win.height
const WRatio = win.width

const AddItem = observer( ({navigation})=>{

    const [image, setImage] = useState()
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [quantity, setQuantity] = useState()
    

    useEffect(()=>{
        getPermission()
    },[])

    const getPermission =async()=>{
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    const pickImage =async()=>{
        try{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing:true,
                aspect:[4, 4],
                quality:0.1
            })
            if(!result.cancelled){
                setImage(result.uri)
            }
            console.log(result)
        }catch(error){
            console.log(error)
        }
    }
    const changePrice =(text)=>{
        setPrice(text.replace(/[^0-9&.]/g, '')) 
    }

    const changeQuantity =(text)=>{
        setQuantity(text.replace(/[^0-9]/g, '')) 
    }

    const addItem =()=>{
        store.addSellerItem({imageURI:image, name:name, price:price, quantity:quantity})
        navigation.goBack()
    }

    return(
        <View style={{flex:1, justifyContent:'center'}}>

            <View style={{width:200, height:200, backgroundColor:'#ffffff', borderWidth:2, borderColor:'#000000', justifyContent:'center', marginHorizontal: (WRatio-200)/2}}>
                <Text style={{position:'absolute', fontSize:20, left:50}}>your image</Text>
                <Image source={{uri:image}} style={{width:'100%', height:'100%'}}/>
            </View>
            
            <TouchableOpacity style={{height:50, backgroundColor:'#3ba8e7', justifyContent:'center', alignItems:'center', margin:20, marginHorizontal: (WRatio-200)/2}} onPress={()=>pickImage()} >
                <Text style={{fontSize:15, color:'#ffffff'}}>Choose the product Image</Text>
            </TouchableOpacity>

            <View style={{width:'100%', height:HRation/2.5,}}>
                <Text style={{fontSize:20, marginTop:10, marginLeft:20}}>name</Text>
                <TextInput
                style={{height:50, borderColor:'#000000', borderWidth:1, borderRadius:10, backgroundColor:'#ffffff', marginLeft:10, marginTop:10, marginRight:100, padding:5, fontSize:20}}
                placeholder="product name"
                onChangeText={text=> setName(text)}
                />

                <Text style={{fontSize:20, marginTop:10, marginLeft:20}}>price</Text>
                <TextInput
                style={{height:50, borderColor:'#000000', borderWidth:1, borderRadius:10, backgroundColor:'#ffffff', marginLeft:10, marginTop:10, marginRight:100, padding:5, fontSize:20}}
                placeholder="price"
                onChangeText={changePrice}
                textContentType='telephoneNumber'
                maxLength={7}
                value={price}
                />

                <Text style={{fontSize:20, marginTop:10, marginLeft:20}}>quantity</Text>
                <TextInput
                style={{height:50, borderColor:'#000000', borderWidth:1, borderRadius:10, backgroundColor:'#ffffff', marginLeft:10, marginTop:10, marginRight:100, padding:5, fontSize:20}}
                placeholder="quantity"
                onChangeText={changeQuantity}
                textContentType='telephoneNumber'
                maxLength={4}
                value={quantity}
                />

                <TouchableOpacity style={{width:300, height:50, backgroundColor:'#3ba8e7', borderRadius:10, borderWidth:1, borderColor:'#000000', marginHorizontal:(WRatio-300)/2, marginTop:20, justifyContent:'center', paddingLeft: 100}}
                onPress={()=>addItem()}>
                    <Text style={{fontSize:25, color:'#ffffff'}}>Add item</Text>
                </TouchableOpacity>

            </View>
            
        </View>
    )
})


export default AddItem