import React, {useEffect, useState} from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput } from 'react-native';
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
                //store.addImage(result.uri)
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
        <View style={styles.container}>

            {/* <FlatList
            data={store.images}
            renderItem={({ item }) => (<Observer>{()=>
                <Image source={{uri:item.uri}} style={styles.image}/>
            }</Observer>
            )}
            keyExtractor={item => item.uri}
            /> */}
            <View style={styles.imageContainer}>
                <Text style={styles.imageText}>your image</Text>
                <Image source={{uri:image}} style={styles.image}/>
            </View>
            
            <TouchableOpacity style={styles.Button} onPress={()=>pickImage()} >
                <Text style={styles.buttonText}>Choose the product Image</Text>
            </TouchableOpacity>

            <View style={styles.info}>
                <Text style={styles.lable}>name</Text>
                <TextInput
                style={styles.inputs}
                placeholder="product name"
                onChangeText={text=> setName(text)}
                />

                <Text style={styles.lable}>price</Text>
                <TextInput
                style={styles.inputs}
                placeholder="price"
                onChangeText={changePrice}
                textContentType='telephoneNumber'
                maxLength={7}
                value={price}
                />
                <Text style={styles.lable}>quantity</Text>
                <TextInput
                style={styles.inputs}
                placeholder="quantity"
                onChangeText={changeQuantity}
                textContentType='telephoneNumber'
                maxLength={4}
                value={quantity}
                />

                <TouchableOpacity style={styles.addButton}
                onPress={()=>addItem()}>
                    <Text style={styles.addText}>Add item</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    Button:{
        width:200,
        height:50,
        backgroundColor:'#3ba8e7',
        justifyContent:'center',
        alignItems:'center',
        margin:20
    },
    image:{
        width:'100%',
        height:'100%'
    },
    imageContainer:{
        width:200,
        height:200,
        backgroundColor:'#ffffff',
        borderWidth:2,
        borderColor:'#000000',
        justifyContent:'center',
        alignItems:'center'
    },
    imageText:{
        position:'absolute',
        fontSize:20,
        zIndex:-1
    },
    buttonText:{
        fontSize:15,
        color:'#ffffff'
    },
    info:{
        width:'100%',
        height:HRation/2.5,
        //backgroundColor:'#dedede'
    },
    inputs:{
        width:WRatio/1.5,
        height:50,
        borderColor:'#000000',
        borderWidth:1,
        borderRadius:10,
        backgroundColor:'#ffffff',
        marginLeft:10,
        marginTop:10,
        padding:5,
        fontSize:20
    },
    lable:{
        fontSize:20,
        marginTop:10,
        marginLeft:20
    },
    addButton:{
        width:'70%',
        height:50,
        backgroundColor:'#3ba8e7',
        borderRadius:10,
        borderWidth:1,
        borderColor:'#000000',
        marginHorizontal:WRatio*0.15,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
    },
    addText:{
        fontSize:25,
        color:'#ffffff' 
    }
})

export default AddItem