import React, { useState, useEffect } from 'react';
import MapView, {Marker} from 'react-native-maps';
import { Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import Animated from 'react-native-reanimated';


const win = Dimensions.get('window')
const WRation = win.width

//const showCard  = useRef(new Animated.Value(0)).current;

const LocationScreen =({navigation})=> {

    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null);
    const [locationSelect, setLocationSelect] = useState('');


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })();
  },[]);

  
  return (
    <View style={{flex: 1, backgroundColor: '#fff',}}>
      {longitude && latitude? 
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
            latitude: latitude,
            longitude: longitude
              }}
          image={require('../../assets/marker-farmerApp.png')}
          title="Home"
          />
              
          <Marker
            coordinate={{
              latitude: 24.798077,
              longitude: 46.642209
              }}
            image={require('../../assets/markerStore-farmerApp.png')}
            title="panda"
            description="supermarker"
            onSelect={()=> setLocationSelect('panda')}
            onDeselect={()=> setLocationSelect('')}/>

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

        {locationSelect === 'panda'?
          
        <View style={{width:WRation*0.8, backgroundColor:'#ffffff', marginBottom:20, position:'absolute', bottom:0, marginHorizontal:WRation*0.1, borderRadius:20, flexDirection:'row', justifyContent:'space-around', padding:WRation*0.05}}>

          <Image 
          style={{ width:WRation*0.3, height:WRation*0.3 }}
          source={require('../../assets/panda.png')}/>

          <View>
            <View style={{marginTop:20, flex:1}}>
              <Text style={{fontSize: 20}}>panda</Text>
              <Text style={{fontSize: 20}}>Supermarket</Text>
            </View>

            <TouchableOpacity style={{flex:1, borderRadius:20, backgroundColor:'#3ba8e7', justifyContent:'center', paddingLeft:15, marginTop:15}}
            onPress={()=> navigation.navigate('Section',{pageTitle:'panda'})}>
              <Text style={{fontSize: 30, color: '#ffffff'}}>Shop</Text>
            </TouchableOpacity>

          </View>
        </View>
        :
        <></>
        }
            
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