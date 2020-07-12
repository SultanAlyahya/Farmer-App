import React, { useState, useEffect } from 'react';
import MapView, {Marker, Callout} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';


const win = Dimensions.get('window')
const WRation = win.width
const HRation = win.height

const LocationS =({navigation})=> {

    const [location, setLocation] = useState(null);
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
      setLocation(location);
      setLatitude(location.coords.latitude)
      setLongitude(location.coords.longitude)
    })();
  },[]);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
      console.log(location)
      console.log(longitude)
      console.log(latitude)
    text = JSON.stringify(location);
  }
  
    return (
      <View style={styles.container}>
        {longitude && latitude? 
        <View style={styles.mapContainer}>
        <MapView style={styles.mapStyle} 
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
            //onCalloutPress={()=> alert('yes')}
            onSelect={()=> setLocationSelect('panda')}
            onDeselect={()=> setLocationSelect('')}>
            </Marker>
        </MapView>
        <View style={styles.barsContainer}>
            <TextInput
            style={styles.search}
            placeholder="search"
            />
             <ScrollView
        contentContainerStyle={styles.searchBar}
        horizontal={true}
        >
            <TouchableOpacity style={styles.bar}>
                <Text>supermarker</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bar}>
                <Text>fastfood</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bar}>
                <Text>Stores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bar}>
                <Text>banks</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
        {locationSelect === 'panda'?
        <View style={styles.infoCard}>
            <Image source={require('../../assets/panda.png')} style={styles.image}/>
            <View style={styles.info}>
                <View style={styles.infoText}>
                    <Text style={styles.lable}>panda</Text>
                    <Text style={styles.lable}>Supermarket</Text>
                </View>
                <TouchableOpacity style={styles.button}
                onPress={()=> navigation.navigate('Section',{pageTitle:'panda'})}>
                    <Text style={styles.buttonText}>Shop</Text>
                </TouchableOpacity>
            </View>
        </View>
        :
        <></>
        }
            
        </View>
        :
        <ActivityIndicator size="small" color="#0000ff" />
        }
        {/* <Text>{text}</Text> */}
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  mapContainer:{
      flex:1
  },
  barsContainer:{
      width:'100%',
      height:100,
      //backgroundColor:'#fff000',
      position:'absolute',
      justifyContent:'space-between',
      alignItems:'center',
      marginTop:20
  },
  search:{
      width:'80%',
      height:50,
      backgroundColor:'#ffffff',
      borderRadius:10,
      paddingLeft:10,
      fontSize:20
  },
  searchBar:{
    width:640,
    height:50,
    //backgroundColor:'#000000',
    alignItems:'center'
  },
  bar:{
      width:150,
      height:40,
      backgroundColor:'#ffffff',
      borderWidth:0.1,
      borderColor:'#000000',
      borderRadius:20,
      marginHorizontal:5,
      paddingLeft:10,
      justifyContent:'center'
  },
  infoCard:{
      width:WRation*0.8,
      height:WRation*0.4,
      backgroundColor:'#ffffff',
      marginBottom:20,
      position:'absolute',
      bottom:0,
      marginHorizontal:WRation*0.1,
      borderRadius:20,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
  },
  image:{
      width:WRation*0.3,
      height:WRation*0.3, 
  },
  info:{
    width:WRation*0.4,
    height:WRation*0.4,
    justifyContent:'center',
    alignItems:'center'
  },
  lable:{
      fontSize:20
  },
  infoText:{
    width:WRation*0.4,
    height:WRation*0.2,
    justifyContent:'center'
  },
  button:{
    width:WRation*0.4-30,
    height:WRation*0.2-30,
    borderRadius:20,
    backgroundColor:'#3ba8e7',
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
      fontSize:30,
      color:'#ffffff'
  }
});

export default LocationS