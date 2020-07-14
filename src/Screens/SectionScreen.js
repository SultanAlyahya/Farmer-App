import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Dimensions, Text } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { observer } from 'mobx-react'
import store from '../Mobx/store'
import 'mobx-react-lite/batchingForReactNative'



const ItenShort= ({
  name,
  id,
  price,
  pieces,
  select,
  addProductTocart,
  deleteProductFormCart,
  increaseProductItems,
  decreaseProductItems
})=> {

  const win = Dimensions.get('window')
  const WRation = win.width
  const itemWidht = WRation/2
  
  return(
      <View style={{flex:1, marginBottom:10}}>
          <View style={{width:itemWidht*0.75, height:itemWidht*0.75, backgroundColor:'#d3d3d3', marginHorizontal:itemWidht*0.25/2}}>
  
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, marginVertical:5}}>
              <Text style={{fontSize:23}}>{name}</Text>
              <Text style={{fontSize:23}}>{price} SR</Text>
          </View>

          {select?

          <View style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'space-around', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}>
              <TouchableOpacity
              onPress={()=>increaseProductItems(id)}>
                  <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>
              <Text style={{fontSize:30, color:'#33dd33'}}>{pieces}</Text>

              {pieces === 1?

              <TouchableOpacity
              onPress={()=> deleteProductFormCart(id)}>
                  <MaterialIcons name="delete" size={35} color="black" />
              </TouchableOpacity>

              :

              <TouchableOpacity
              onPress={()=>decreaseProductItems(id)}>
                  <Entypo name="minus" size={35} color="black" />
              </TouchableOpacity>

              }
          </View>

          :

          <TouchableOpacity style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}
          onPress={()=>addProductTocart(id)}>
              <Text style={{fontSize:25, color:'#33dd33'}}>add </Text>
              <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
          </TouchableOpacity>

          }
          
      </View>
  )
}

const ItenLong =({
  name,
  id,
  price,
  pieces,
  select,
  addProductTocart,
  deleteProductFormCart,
  increaseProductItems,
  decreaseProductItems
})=> {
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

              <TouchableOpacity
              onPress={()=>increaseProductItems(id)}>
                  <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>

              <Text style={{fontSize:30, color:'#33dd33'}}> {pieces}</Text>

              {pieces === 1?

              <TouchableOpacity
              onPress={()=> deleteProductFormCart(id)}>
                  <MaterialIcons name="delete" size={35} color="black" />
              </TouchableOpacity>

              :

              <TouchableOpacity
              onPress={()=>decreaseProductItems(id)}>
                  <Entypo name="minus" size={35} color="black" />
              </TouchableOpacity>

              }
          </View>

          :

          <TouchableOpacity
          style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30}}
          onPress={()=>addProductTocart(id)}>
              <Text style={{fontSize:30, color:'#33dd33'}}>add </Text>
              <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
          </TouchableOpacity>

          }
          
      </View>
  )
}



const SectionScreen =observer( ()=>{

  const [search,setSearch] = useState()
  const [filterLong, setFilterLong] = useState(false)

  const header =()=>{
    return(
      <View style={{flexDirection:'row', marginBottom:5}}>

        <TouchableOpacity onPress={()=> setFilterLong(false)}>
          <AntDesign name="appstore-o" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> setFilterLong(true)}>
          <AntDesign name="bars" size={40} color="black" />
        </TouchableOpacity>

      </View>
    )
  }

  const addProductTocart =(id)=> {
    store.addProductToCart(id)
  }

  const deleteProductFormCart =(id)=> {
    store.deleteProductFormCart(id)
  }

  const increaseProductItems =(id)=> {
    store.increaseProductItems(id)
  }

  const decreaseProductItems =(id)=> {
    store.decreaseProductItems(id)
  }

  return(
    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
      
      <View style={{backgroundColor:'#33dd33', justifyContent: 'center', paddingHorizontal:10}}>
        <TextInput 
          style={{backgroundColor:'#ffffff', height:50, borderWidth:0.5, borderColor:'#000000', borderRadius:10, fontSize:25, paddingLeft:10, marginBottom:5}}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder='search'
        />
      </View>
      
      {filterLong?
            
      <FlatList
      data={store.getProducts}
      extraData={store.renderSection}
      ListHeaderComponent={header}
      renderItem={({item, index})=>
        <ItenLong
          name={item.name}
          price={item.price}
          id={item.id}
          select={item.select}
          pieces={item.pieces}
          index={index}

          addProductTocart={addProductTocart}
          deleteProductFormCart={deleteProductFormCart}
          increaseProductItems={increaseProductItems}
          decreaseProductItems={decreaseProductItems}
        />  
      }
      key={('1')}
      keyExtractor={item => item.id}
      />
            
      :
            
      <FlatList
      data={store.getProducts}
      extraData={store.renderSection}
      numColumns={2}
      ListHeaderComponent={header}
      renderItem={({item, index})=>
        <ItenShort
          name={item.name}
          price={item.price}
          id={item.id}
          select={item.select}
          pieces={item.pieces}
          index={index}

          addProductTocart={addProductTocart}
          deleteProductFormCart={deleteProductFormCart}
          increaseProductItems={increaseProductItems}
          decreaseProductItems={decreaseProductItems}
        />  
      }
      key={('2')}
      keyExtractor={item => item.id}
      />
      }
    </View>
  )

})
 

export default SectionScreen;