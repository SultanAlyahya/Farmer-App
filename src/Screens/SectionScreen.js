import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { dameItems } from '../../assets/dameData'
import ItenShort from '../Components/ItemShort'
import ItenLong from '../Components/itemLong'
// import {connect} from 'react-redux'
// import {addItem} from '../Redux/Action'
import {observer, Observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'



const SectionScreen= observer( (props)=>{

  const [search,setSearch] = useState()
  const [sortLong, setSortLong] = useState(false)

  const header =()=>{
    return(
      <View style={styles.sortView}>
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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
        style={styles.textInput}
        onChangeText={text => setSearch()}
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

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        backgroundColor:'#ffffff'
    },
    searchContainer:{
        width: '100%',
        height:50,
        backgroundColor:'#33dd33',
        alignItems: 'center',
        justifyContent: 'center',
      },
      textInput:{
        width:'95%',
        backgroundColor:'#ffffff',
        height:46,
        borderWidth:0.5,
        borderColor:'#000000',
        borderRadius:10,
        padding:2,
        fontSize:25,
        paddingLeft:10
      },
      sortView:{
          width:'100%',
          height:40,
          //backgroundColor:'#d3d3d3',
          flexDirection:'row',
          marginBottom:5
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
//       add: (item) => dispatch(addItem(item))
//     }
//   }  

export default SectionScreen;