import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Dimensions, Text, Image } from 'react-native';
import { MaterialCommunityIcons} from '@expo/vector-icons';
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
          <View>
            <Image style={{width: itemWidht, height: itemWidht}}
            source={require('../../assets/lettuce.png')}/>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, marginVertical:5}}>
              <Text style={{fontSize:23}}>{name}</Text>
              <Text style={{fontSize:23}}>{price} SR</Text>
          </View>

          {select?

          <View style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'space-around', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}>
              <TouchableOpacity
              onPress={()=>increaseProductItems(id)}>
                  <MaterialCommunityIcons name="plus" size={40} color="#000" />
              </TouchableOpacity>
              <Text style={{fontSize:30, color:'#33dd33'}}>{pieces}</Text>

              {pieces === 1?

              <TouchableOpacity
              onPress={()=> deleteProductFormCart(id)}>
                  <MaterialCommunityIcons name="delete" size={35} color="#000" />
              </TouchableOpacity>

              :

              <TouchableOpacity
              onPress={()=>decreaseProductItems(id)}>
                  <MaterialCommunityIcons name="minus" size={40} color="#000" />
              </TouchableOpacity>

              }
          </View>

          :

          <TouchableOpacity style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}
          onPress={()=>addProductTocart(id)}>
              <Text style={{fontSize:25, color:'#33dd33'}}>add </Text>
              
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
          <Image style={{width: 150, height: 150}}
            source={require('../../assets/lettuce.png')}/>

          <View style={{justifyContent:'space-around'}}>
              <Text style={{fontSize:25}}>{name}</Text>
              <Text style={{fontSize:20}}>Price: {price} SR</Text>
          </View>

          {select?
          <View style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30,  marginHorizontal:2}}>

              <TouchableOpacity
              onPress={()=>increaseProductItems(id)}>
                  <MaterialCommunityIcons name="plus" size={40} color="#000" />
              </TouchableOpacity>

              <Text style={{fontSize:30, color:'#33dd33'}}>  {pieces}</Text>

              {pieces === 1?

              <TouchableOpacity
              onPress={()=> deleteProductFormCart(id)}>
                  <MaterialCommunityIcons name="delete" size={40} color="#000" />
              </TouchableOpacity>

              :

              <TouchableOpacity
              onPress={()=>decreaseProductItems(id)}>
                  <MaterialCommunityIcons name="minus" size={40} color="#000" />
              </TouchableOpacity>

              }
          </View>

          :

          <TouchableOpacity
          style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30, marginHorizontal:2}}
          onPress={()=>addProductTocart(id)}>
              <Text style={{fontSize:30, color:'#33dd33'}}>add </Text>
              
          </TouchableOpacity>

          }
          
      </View>
  )
}



const SectionScreen =observer( ()=>{

  const [search,setSearch] = useState()
  const [isGrid, setIsGrid] = useState(false)

  const ListHeaderComponent =()=>{
    return(
      <View style={{flexDirection:'row', marginBottom:5, borderBottomWidth: 1, borderBottomColor: '#000'}}>
        <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'space-around', padding:5, borderRightWidth: 1, borderColor: '#000'}}>
          <Text style={{fontSize:25}}>Sort by </Text>
          <MaterialCommunityIcons name="sort" size={30} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'space-around', padding:5, borderRightWidth: 1, borderColor: '#000'}}>
          <Text style={{fontSize:25}}>Filter </Text>
          <MaterialCommunityIcons name="filter" size={30} color="#000" />
        </TouchableOpacity>
        <View style={{flex:1}}>
          {isGrid? 
           <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'space-around', padding:5}}
           onPress={()=> setIsGrid(false)}>
            <Text style={{fontSize:25, marginVertical: 0}}>Grid</Text>
            <MaterialCommunityIcons name="view-grid" size={30} color="#000" />
          </TouchableOpacity>
       
          :
          <TouchableOpacity style={{flex: 1, backgroundColor:'#fff', flexDirection:'row', justifyContent: 'space-around', padding:5}}
          onPress={()=> setIsGrid(true)}>
            <Text style={{fontSize:25, marginVertical: 0}}>Row </Text>
            <MaterialCommunityIcons name="view-sequential" size={30} color="#000" />
          </TouchableOpacity>
          }
        </View>
        

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
      <ListHeaderComponent/>
      
      {isGrid?
            
      <FlatList
      data={store.getProducts}
      extraData={store.renderSection}
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