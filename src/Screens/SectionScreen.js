import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Dimensions, Text } from 'react-native';
import { MaterialCommunityIcons, Entypo, MaterialIcons, AntDesign } from '@expo/vector-icons';
import {observer, Observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'



const ItenShort=observer (({name, id, price, pieces, select})=> {

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
              onPress={()=>store.plus(id)}>
                  <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>
              <Text style={{fontSize:30, color:'#33dd33'}}>{pieces}</Text>

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

          <TouchableOpacity style={{height:50, marginHorizontal:10, borderRadius:5, flexDirection:'row', justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingTop:7}}
          onPress={()=>store.select(id)}>
              <Text style={{fontSize:25, color:'#33dd33'}}>add </Text>
              <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
          </TouchableOpacity>

          }
          
      </View>
  )
})

const ItenLong= observer( ({name, id, price, pieces, select})=>{
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

              <TouchableOpacity style={styles.sign}
              onPress={()=>store.plus(id)}>
                  <Entypo name="plus" size={35} color="black" />
              </TouchableOpacity>

              <Text style={{fontSize:30, color:'#33dd33'}}> {pieces}</Text>

              {pieces === 1?

              <TouchableOpacity
              onPress={()=> store.delete(id)}>
                  <MaterialIcons name="delete" size={35} color="black" />
              </TouchableOpacity>

              :

              <TouchableOpacity style={styles.sign}
              onPress={()=>store.minus(id)}>
                  <Entypo name="minus" size={35} color="black" />
              </TouchableOpacity>

              }
          </View>

          :

          <TouchableOpacity
          style={{width:100, borderRadius:5, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', paddingLeft:30}}
          onPress={()=>store.select(id)}>
              <Text style={{fontSize:30, color:'#33dd33'}}>add </Text>
              <MaterialCommunityIcons name="cart-plus" size={35} color="#33dd33" />
          </TouchableOpacity>

          }
          
      </View>
  )
})



const SectionScreen= observer( (props)=>{

  const [search,setSearch] = useState()
  const [sortLong, setSortLong] = useState(false)

  const header =()=>{
    return(
      <View style={{flexDirection:'row', marginBottom:5}}>

        <TouchableOpacity onPress={()=> setSortLong(false)}>
          <AntDesign name="appstore-o" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> setSortLong(true)}>
          <AntDesign name="bars" size={40} color="black" />
        </TouchableOpacity>

      </View>
    )
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
      
      {sortLong?
            
      <FlatList
      data={store.list}
      ListHeaderComponent={header}
      renderItem={({item, index})=>(<Observer>{()=>
        <ItenLong
          name={item.name}
          price={item.price}
          id={item.id}
          select={item.select}
          pieces={item.pieces}
          index={index}
        />  
      }</Observer>
      )}
      key={('1')}
      keyExtractor={item => item.name}
      />
            
      :
            
      <FlatList
      data={store.list}
      numColumns={2}
      ListHeaderComponent={header}
      renderItem={({item, index})=>(<Observer>{()=>
        <ItenShort
          name={item.name}
          price={item.price}
          id={item.id}
          select={item.select}
          pieces={item.pieces}
          index={index}
        />
      }</Observer>  
      )}
      key={('2')}
      keyExtractor={item => item.name}
      />
      }
    </View>
  )

})


// const mapStateToProps =(state)=>{
//     //console.log(state.itemReducer.items)
//     return{
//         items: state.itemReducer.items
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//       add: (item) => dispatch(addItem(item))
//     }
//   }  

export default SectionScreen;