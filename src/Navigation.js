import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import {Observer} from 'mobx-react'
import 'mobx-react-lite/batchingForReactNative'
import store from './Mobx/store'


import HomeScreen from './Screens/HomeScreen'
import OrderScreen from './Screens/OrderScreen'
import SectionScreen from './Screens/SectionScreen'
import CartScreen from './Screens/CartScreen'
import ProfileScreen from './Screens/ProfileScreen'
import LoginScreen from './Screens/LoginScreen'
import AddItem from './Screens/AddItemScreen'
import DeleteItem from './Screens/DeleteItemScreen'
import Statistics from './Screens/StatisticsScreen'
import LocationScreen from './Screens/LocationScreen'



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const HomeScreens=()=> {
  return (  
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle:"Farmer", headerStyle:{backgroundColor:'#33dd33'}}} />
      <Stack.Screen name="Section" component={SectionScreen} options={({route})=> ({headerTitle:route.params.pageTitle, headerStyle:{backgroundColor:'#33dd33'}})} />
    </Stack.Navigator>
    
  );
}

const OrderScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="your orders" component={OrderScreen} options={{headerTitle:"Orders", headerStyle:{backgroundColor:'#33dd33'}}} /> 
    </Stack.Navigator>
  )
}

const CartScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="cart" component={CartScreen} options={{headerTitle:"Cart", headerStyle:{backgroundColor:'#33dd33'}}} /> 
    </Stack.Navigator>
  )
}
const ProfileScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="profile" component={ProfileScreen} options={{headerTitle:"User Profile", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="login" component={LoginScreen} options={{headerTitle:"User Profile", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="addItem" component={AddItem} options={{headerTitle:"Add Item", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="deleteItem" component={DeleteItem} options={{headerTitle:"delete Item", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="statistics" component={Statistics} options={{headerTitle:"Statistics", headerStyle:{backgroundColor:'#3ba8e7'}}} />  
    </Stack.Navigator>
  )
}

const LocationScreens =()=> {
  return(
    <Stack.Navigator>
      <Stack.Screen name="location" component={LocationScreen} options={{headerTitle:"Orders", headerStyle:{backgroundColor:'#33dd33'}}}/>
    </Stack.Navigator>
  )
}

const Navigation = ()=>{

  const IconWithBadge=({ color, size }) =>(
    <Observer>{()=>
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <AntDesign name="shoppingcart" color={color} size={size} />
          {store.numOfProductInCart > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {store.numOfProductInCart}
            </Text>
          </View>
          )}
      </View>
    }</Observer>
  );
      
      
  return(
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{activeTintColor:'#00dd00'}}>

        <Tab.Screen name="Home"  component={HomeScreens} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="Cart" component={CartScreens} options={{
          tabBarIcon: IconWithBadge
        }}
        />

        <Tab.Screen name="location" component={LocationScreens} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="Orders" component={OrderScreens} options={{
          tabBarIcon: ({ color, size }) => (
            <Octicons name="list-unordered" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="Profile" component={ProfileScreens} options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" color={color} size={size} />
          ),
        }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default Navigation;
