import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {testSections} from '../../assets/testData'
import {testOffers} from '../../assets/testData'
import {testItems} from '../../assets/testData'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'



const Sections=(props)=>{
  return(
    <TouchableOpacity style={{height: 150, backgroundColor: '#ffffff', borderRadius: 20, flexDirection: 'row', margin: 5}} 
    onPress={()=> props.navigation.navigate('Section',{pageTitle:props.pageTitle})}>
      
      <View style={{width: 90, fontSize: 30, justifyContent: 'center', paddingLeft: 10}}>
        <Text style={{fontSize: 30}}>{props.logo}</Text>
      </View>

      <View style={{flex:1, backgroundColor: '#22aa22', borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', paddingLeft: 20, backgroundColor: props.color}}>
      <Text style={{fontSize: 30}}>{props.title}</Text>
    </View>

  </TouchableOpacity>
  );
}


const HomeScreen=observer ((props)=> {

  const [search,setSearch] = useState()

  useEffect(() => {
    store.add(testItems)
  }, []);

  const ListHeaderComponent=(props)=>{
    return(
      <View style={{flex: 1}}>

        <TouchableOpacity style={{marginVertical: 5}}>
          <Text style={{fontSize: 30}}>  New offers</Text>
        </TouchableOpacity>
        

        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{flex: 1}}
        data={testOffers}
        renderItem={({ item }) => (
          <TouchableOpacity style={{width: 90, height: 90, margin: 5, borderRadius: 360, backgroundColor: item.color}} />
        )}
        keyExtractor={item => item.id}
        />

        
        <TouchableOpacity style={{marginVertical:5}}>
          <Text style={{fontSize:30}}>  Sections</Text>
        </TouchableOpacity>
    

      </View>
    )
  }


  return (
    <View style={{flex: 1}}>       

      <View style={{backgroundColor: '#33dd33', justifyContent: 'center', paddingHorizontal: 10}}>
        <TextInput 
          style={{backgroundColor: '#ffffff', height: 50, borderWidth: 0.5, borderColor: '#000000', borderRadius: 10, fontSize: 25, paddingLeft: 10, marginBottom: 5}}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder='search'
        />
      </View>
      
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        style={{flex:1}}
        data={testSections}
        renderItem={({ item }) => (
          <Sections
            title={item.title}
            logo={item.logo}
            color={item.color}
            navigation={props.navigation}
            pageTitle={item.title}
          />
        )}
        keyExtractor={item => item.id}      
      />
        
    </View>
  );
})


export default HomeScreen;