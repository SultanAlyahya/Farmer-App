import React, { useState, useEffect, useRef } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import * as Location from 'expo-location';
//import Animated from 'react-native-reanimated';
import {testMarkers} from '../../assets/testData'

const win = Dimensions.get('window')
const WRation = win.width



const LocationScreen =({navigation})=> {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState(null);
    const [currentLocationCard, setCurrentLocationCard] = useState({uri: require("../../assets/Alsadhan-farmerApp.png"), title: '', description: ''})
    //const [showCard, setShowCard] = useState(false)
    const [homeMarkerLat, setHomeMarkerLat] = useState(null)
    const [homeMarkerlong, setHomeMarkerlong] = useState(null)




  useEffect(() => {
   
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
      setHomeMarkerLat(location.coords.latitude)
      setHomeMarkerlong(location.coords.longitude)
    })();
    setMarkers(testMarkers)
  },[]);

  const cardAnimation = useRef(new Animated.Value(-200)).current;

  const changLocationCard = ({title, description, uri, lat, long}) => {
    setLatitude(lat)
    setLongitude(long)
    Animated.timing(cardAnimation, {
      toValue: -200,
      duration: 300,
      useNativeDriver: false
    }).start(async()=>{
      await setCurrentLocationCard({title, description, uri})
      Animated.timing(cardAnimation, {
        toValue: 20,
        duration: 300,
        useNativeDriver: false
      }).start();
    });
  };

  const loadMarkers =()=> {
    return(
        markers.map((marker)=>
        <Marker
        coordinate={{
          key: marker.id,
          latitude: marker.lat,
          longitude: marker.long
        }}
        image={require('../../assets/markerStore-farmerApp.png')}
        title={marker.title}
        description={marker.description}
        onSelect={()=> changLocationCard({title: marker.title, description: marker.description, uri: marker.imageUri, lat: marker.lat, long: marker.long})}
        />
        )  
    )
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff',}}>
      {longitude && latitude && homeMarkerLat && homeMarkerlong? 
      <View style={{flex:1}}>
        <MapView style={{flex:1}} 
        region={{
            latitude: latitude,
            longitude: longitude,
            longitudeDelta: 0.015,
            latitudeDelta: 0.020
        }}>

          <Marker
          coordinate={{
            latitude: homeMarkerLat,
            longitude: homeMarkerlong
              }}
          image={require('../../assets/marker-farmerApp.png')}
          title="Home"
          />
              
          {loadMarkers()}

        </MapView>

        <View style={{position: 'absolute', top: 20,}}>

          <TextInput
          style={{marginHorizontal: 20, marginBottom: 10, height: 50, backgroundColor: '#ffffff', borderRadius: 10, paddingLeft: 10, fontSize: 20}}
          placeholder="search"
          />

          <ScrollView
          horizontal={true}>

            <TouchableOpacity style={{width: 150, height: 40, backgroundColor: '#ffffff', borderRadius: 20, marginHorizontal: 5, paddingLeft: 10, justifyContent: 'center'}}>
              <Text>supermarker</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 150, height: 40, backgroundColor: '#ffffff', borderRadius: 20, marginHorizontal: 5, paddingLeft: 10, justifyContent: 'center'}}>
              <Text>fastfood</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 150, height: 40, backgroundColor: '#ffffff', borderRadius: 20, marginHorizontal: 5, paddingLeft: 10, justifyContent: 'center'}}>
              <Text>Stores</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{width: 150, height: 40, backgroundColor: '#ffffff', borderRadius: 20, marginHorizontal: 5, paddingLeft: 10, justifyContent: 'center'}}>
              <Text>banks</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>

        
          
        <Animated.View style={[{ width:300, backgroundColor:'#ffffff', position:'absolute', marginHorizontal:(WRation-300)/2, borderRadius:20, flexDirection:'row', justifyContent:'space-around', padding:20},
          {
            bottom: cardAnimation
          }
        ]}>

          <Image 
          style={{ width: 120, height: 120 }}
          source={currentLocationCard.uri}
          />

          <View>
            <View style={{marginTop:20}}>
              <Text style={{fontSize: 20}}>{currentLocationCard.title}</Text>
              <Text style={{fontSize: 20}}>{currentLocationCard.description}</Text>
            </View>

            <TouchableOpacity style={{ borderRadius:10, backgroundColor:'#3ba8e7', justifyContent:'center', paddingLeft:15, marginTop:15}}
            onPress={()=> navigation.navigate('Section',{pageTitle:'panda'})}>
              <Text style={{fontSize: 30, color: '#ffffff'}}>Shop</Text>
            </TouchableOpacity>

          </View>
        </Animated.View>
       
            
      </View>
      :
      <View style={{flex: 1 ,justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
      }
    </View>
  );
  
}


export default LocationScreen