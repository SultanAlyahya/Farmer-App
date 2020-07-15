import React, { useState, useRef } from 'react';
import { View, FlatList, Text, TouchableOpacity, PanResponder, Animated } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import { observer } from 'mobx-react'
import store from '../Mobx/store'
import 'mobx-react-lite/batchingForReactNative'

const ItemsInCart= ({
    name,
    price,
    id,
    pieces,
    deleteProductFormCart,
    increaseProductItems,
    decreaseProductItems,
})=> {

    const pan = useRef(new Animated.Value(0)).current
    const deleteButtonWidth = useRef(new Animated.Value(0)).current

    var moveDeleteReady = false
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: ()=> true,
        onPanResponderGrant:() => {
            Animated.timing(deleteButtonWidth,
            { 
                toValue: 0,
                useNativeDriver: false,
                duration:200
            },
            moveDeleteReady = false,
            ).start();
          },
        onPanResponderMove: Animated.event(
            [ 
              null,
              { 
                dx: pan
              }
            ],
            { 
                useNativeDriver: false,
                listener: ()=>{
                    if(!moveDeleteReady){
                        if(pan._value<-50)
                            Animated.timing(deleteButtonWidth,
                            { 
                                toValue: 60,
                                useNativeDriver: false,
                                duration:200
                            },
                            moveDeleteReady = true
                            ).start();    
                    }
                }
            },
        ),
        onPanResponderRelease: () => {
         
        }
        
    })

    const swipe = {
        autoClose:true,
         right:[{ 
            text:'delete', 
            onPress:()=> deleteProductFormCart(id),
            underlayColor: '#ff0000',
            backgroundColor: '#a44'
          }],
      }
    return(
        //<Swipeout {...swipe}>
        <Animated.View {...panResponder.panHandlers}>
            <View style={{backgroundColor:'#ffffff', flexDirection:'row', justifyContent:'space-between', borderBottomWidth:1, borderColor:'#000000', flex: 1 }}>
                <View style={{width:100, height:100, backgroundColor:'#333333'}}>

                </View>

                <View style={{padding:10, justifyContent:'space-around'}}>
                    <Text style={{fontSize:20}}>{name}</Text>
                    <Text>price:{"\n"}{price*pieces} SR</Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-around', marginTop:20}}>

                    <TouchableOpacity styles={{width:50, height:50}}
                    onPress={()=> increaseProductItems(id)}>
                        <Entypo name="plus" size={50} color="black" />
                    </TouchableOpacity>

                    <Text style={{fontSize:50}}>{pieces}</Text>

                    <TouchableOpacity styles={{width:50, height:50}}
                    onPress={()=> decreaseProductItems(id)}>
                        <Entypo name="minus" size={50} color="black" />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={{marginHorizontal:10, marginTop:25}}
                onPress={()=> deleteProductFormCart(id)}>
                    <MaterialIcons name="delete" size={50} color="black" />
                </TouchableOpacity>
            
                <Animated.View style={[{  backgroundColor:'#dd2222', position:'absolute', borderTopLeftRadius:20, borderBottomLeftRadius:20, flexDirection:'row', height: '100%', right:0},
                {
                width: deleteButtonWidth
                }
                ]}>
                    <TouchableOpacity style={{flex: 1, justifyContent:'center'}}
                    onPress={()=> deleteProductFormCart(id)}>
                        <MaterialIcons name="delete" size={60} color="black" /> 
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Animated.View>
        //</Swipeout>
     
    )
}

const CartScreen=observer( ()=>{

    const [itemMove, setItemMove] = useState(true)

    const deleteProductFormCart =(id)=> {
        store.deleteProductFormCart(id)
    }
    
    const increaseProductItems =(id)=> {
        store.increaseProductItems(id)
    }
    
    const decreaseProductItems =(id)=> {
        store.decreaseProductItems(id)
    }

    // const stopeScrolling =(XAxis)=> {
    //     console.log(XAxis)
    //     if(XAxis._value !== 0 && itemMove){
    //         setItemMove(false)
    //     }
    // }

    // const scrollingRelease =(YAxis)=> {
    //     //console.log(YAxis)
    //     setItemMove(true)
    // }
    
   
    return(
        <View style={{flex: 1}}>
            <FlatList
            data={store.getProducts}
            scrollEnabled={itemMove}
            extraData={store.renderSection}
            renderItem={({item,index})=>
            item.select?
            
                <ItemsInCart
                name={item.name}
                price={item.price}
                id={item.id}
                pieces={item.pieces}
                index={index}

                deleteProductFormCart={deleteProductFormCart}
                increaseProductItems={increaseProductItems}
                decreaseProductItems={decreaseProductItems}
                // stopeScrolling={stopeScrolling}
                // scrollingRelease={scrollingRelease}
                />
            
            :
                <View></View>
           
            }
            keyExtractor={item=> item.name+""+item.price}
            />
        </View>
    )
    
})


export default CartScreen;