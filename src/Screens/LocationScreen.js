import React, { useState, useEffect, useRef } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator, Animated, Navigator } from 'react-native';
import * as Location from 'expo-location';
import { testMarkers } from '../../assets/testData';

const win = Dimensions.get('window')
const WRation = win.width
const cardWidth = WRation -50
const cardHeight = cardWidth/3+50


const LocationScreen =({navigation})=> {

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [currentLocationCard, setCurrentLocationCard] = useState({uri: require("../../assets/Alsadhan-farmerApp.png"), title: '', description: ''})




  useEffect(() => {
   
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({lat: location.coords.latitude, long: location.coords.longitude})
    })();
    setMarkers(testMarkers) 
  },[]);

  const initialRender = useRef(true);

  useEffect(()=>{
    if(initialRender.current){
      initialRender.current = false
    }
    else{
      Animated.spring(cardAnimation, {
        toValue: -180,
        useNativeDriver: true
      }).start();
    }
  }, [currentLocationCard])



  const cardAnimation = useRef(new Animated.Value(0)).current;

  const changLocationCard = ({title, description, uri}) => {
    Animated.timing(cardAnimation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(()=>{
      setCurrentLocationCard({title, description, uri})
      
    });
  };

  const loadMarkers =()=> {
    return(
        markers.map((marker, index)=>
        <Marker
        coordinate={{
          key: marker.id,
          latitude: marker.lat,
          longitude: marker.long
        }}
        key={marker.id}
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


      {location? 
      <View style={{flex:1}}>
        <MapView style={{flex:1}}
        initialRegion={{
            latitude: 24.802731,
            longitude: 46.634732,
            longitudeDelta: 0.015,
            latitudeDelta: 0.020
        }}
        >

          <Marker
          coordinate={{
            latitude: location.lat,
            longitude: location.long
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

        
          
        <Animated.View style={[{ width: cardWidth, height: cardHeight, backgroundColor:'#ffffff', position:'absolute', marginHorizontal: 25, borderRadius:20, flexDirection:'row', justifyContent:'space-around', padding:20, bottom: -cardHeight},
          {transform: [{translateY: cardAnimation}]}
        ]}>

          <Image 
          style={{ width: cardWidth/3, height: cardWidth/3, marginRight:10 }}
          source={currentLocationCard.uri}
          />

          <View style={{justifyContent:'center'}}>
            <View style={{marginLeft:20}}>
              <Text style={{fontSize: 20}}>{currentLocationCard.title}</Text>
              <Text style={{fontSize: 20}}>{currentLocationCard.description}</Text>
            </View>

            <TouchableOpacity style={{ borderRadius:10, backgroundColor:'#3ba8e7', justifyContent:'center', flexDirection:'row'}}
            onPress={()=> navigation.navigate('Section',{pageTitle: currentLocationCard.title})}>
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