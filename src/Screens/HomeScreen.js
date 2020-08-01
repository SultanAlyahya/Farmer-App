import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Image, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import {testSections} from '../../assets/testData'
import {testOffers} from '../../assets/testData'
import {testItems} from '../../assets/testData'
import {observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from '../Mobx/store'


const win = Dimensions.get('window')
const HRatio = win.height


const Sections=({
  backgroundSectionColor,
  title,
  logo,
  goToSectionScreen
})=>{
  return(
    
      <TouchableOpacity style={{height: 150, backgroundColor: '#ffffff', borderRadius: 20, flexDirection: 'row', margin: 5}} 
      onPress={()=> goToSectionScreen( title )}>
        
        <View style={{width: 120, fontSize: 30, justifyContent: 'center', paddingLeft: 10}}>
          <Text style={{fontSize: 20}}>{title}</Text>
        </View>

        {/* <View style={{flex:1, backgroundColor: '#22aa22', borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', paddingLeft: 20, backgroundColor: backgroundSectionColor}}>
          <Text style={{fontSize: 30}}>{title}</Text>
        </View> */}

        <View style={{flex:1,}}>
          <Image
            style={{width:'100%', height:'100%', borderTopRightRadius: 20, borderBottomRightRadius: 20}}
            source={require('../../assets/fruit-farmerApp.jpg')}/>
        </View>
        <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,1)']}
            style={{position:'absolute', width:'100%', height:'100%'}}/>

    </TouchableOpacity>
  );
}


const HomeScreen=observer (({navigation})=> {

  const [search,setSearch] = useState()

  const ratingPageValue = useRef( new Animated.Value(0)).current

  const moveRatingPageUp =()=>{
    Animated.timing(ratingPageValue,{
      toValue: -HRatio,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  const moveRatingPageDown =()=>{
    Animated.timing(ratingPageValue,{
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  useEffect(() => {
    store.addProductsToProductsList(testItems);
    (async()=>{
      await SplashScreen.hideAsync()
    })()
  }, []);

  const ListHeaderComponent=()=>{
    return(
      <View style={{flex: 1}}>

        <TouchableOpacity style={{marginVertical: 5}}>
          <Text style={{fontSize: 30, color:'#33dd33'}}>  New offers</Text>
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
          <Text style={{fontSize:30, color:'#33dd33'}}>  Sections</Text>
        </TouchableOpacity>
    

      </View>
    )
  }

  const RatingPage =()=> {
    return(
      <Animated.View style={[{width:'100%', height:'100%', position:'absolute', bottom:-HRatio},
      {transform: [{translateY: ratingPageValue}]}
      ]}>
        <TouchableOpacity style={{height:200, width:'100%', opacity:0}}
        onPress={()=>moveRatingPageDown()}/>

        <View style={{flex:1, backgroundColor:'#222222', borderTopLeftRadius:20, borderTopRightRadius:20}}>
          <Text style={{fontSize: 30, color:'#33dd33', margin:20}}>please rate out services</Text>
          <TouchableOpacity style={{margin:30, justifyContent:'center', flexDirection:'row', borderWidth:1, borderColor:'#33dd33', padding: 15, borderRadius:10}}
           onPress={()=>moveRatingPageDown()}>
            <Text style={{fontSize: 30, color:'#33dd33'}}>good</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }

  const ListFooterComponent =()=> {
    return(
      <TouchableOpacity style={{margin:30, justifyContent:'center', borderWidth:1, borderColor:'#33dd33', padding: 15, borderRadius:10, flexDirection:'row'}}
      onPress={()=>moveRatingPageUp()}>
        <Text style={{fontSize: 30, color:'#33dd33'}}>rate our services</Text>
      </TouchableOpacity>
    )
  }

  const goToSectionScreen =( pageTitle )=> {
    navigation.navigate('Section',{pageTitle: pageTitle})
  }


  return (
    <View style={{flex: 1, backgroundColor:'#000000'}}>       

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
        ListFooterComponent={ListFooterComponent}
        style={{flex:1}}
        data={testSections}
        renderItem={({ item }) => (
          <Sections
            title={item.title}
            logo={item.logo}
            backgroundSectionColor={item.color}
            goToSectionScreen={goToSectionScreen}
          />
        )}
        keyExtractor={item => item.id}      
      />
      <RatingPage/>
    </View>
  );
})


export default HomeScreen;