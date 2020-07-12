import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import {dameSections} from '../../assets/dameData'
import Sections from '../Components/Sections'
import {dameOffers} from '../../assets/dameData'
//import {connect} from 'react-redux'
import {dameItems} from '../../assets/dameData'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'




const HomeScreen=observer ((props)=> {

  const [search,setSearch] = useState()
  const [offresNum, setOffersNum] = useState(6)
  const [sectionsNum, setSectionsNum] = useState(5)

  useEffect(() => {
    //props.add(dameItems)
    store.add(dameItems)
  }, []);

  const header=(props)=>{
    return(
      <View style={styles.offers}>

        <TouchableOpacity style={styles.textContainer}>
          <Text style={styles.SectionText}>  New offers</Text>
        </TouchableOpacity>
        

        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{...styles.offersContainer, width:offresNum*100}}
        data={dameOffers}
        renderItem={({ item }) => (
          <TouchableOpacity style={{...styles.offerItems, backgroundColor: item.color}} />
        )}
        keyExtractor={item => item.color}
        />

        <View style={styles.sectionTextContainer}>
          <TouchableOpacity style={styles.textContainer} onPress={()=> console.log(dameSections)}>
            <Text style={styles.SectionText}>  Sections</Text>
          </TouchableOpacity>
        </View>

      </View>
    )
  }

  return (
    <View style={styles.container}>       

      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.textInput}
          onChangeText={text => setSearch(text)}
          value={search}
          placeholder='search'
        />
      </View>
      
      <FlatList
        ListHeaderComponent={header}
        contentContainerStyle={{...styles.sectionList,height:(sectionsNum*160)+180}}
        data={dameSections}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#f3f3f3',
    //alignItems: 'center',
    //justifyContent: 'center',
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
  testB:{
    width:30,
    height:30,
    backgroundColor:'#000000'
  },
  offers:{
    width:'100%',
    height:180,
  
  },
  offersContainer:{
    height:100,
    width:'100%',
    //backgroundColor:'#444444',
    marginTop:5,
  },
  offerItems:{
    width:90,
    height:90,
    margin:5,
    borderRadius:360
  },
  textContainer:{
    height:30,
    width:'50%',
    margin:2.5
  },
  SectionText:{
    fontSize:30,
  },
  SectionsContainer:{
    width:'100%',
    //backgroundColor:'#000000',
    justifyContent:'space-around',
    alignItems:'center'
  },
  sectionItems:{
    width:'95%',
    height:150,
    //margin:5,
    backgroundColor:'#ffffff',
    borderRadius:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  sectionLogoContainer:{
    width:'33%',
    height:'100%',
    fontSize:30,
    justifyContent:'center',
    alignItems:'center'
  },
  sectionLogo:{
    fontSize:30,
  },
  sectionBody:{
    width:'67%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#22aa22',
    borderTopRightRadius:20,
    borderBottomRightRadius:20
  },
  sectionTextContainer:{
    height:40,
    width:'100%',
  },
  sectionList:{
    width:'100%',
    justifyContent:'space-around',
    alignItems:'center'
  }
});


export default HomeScreen;