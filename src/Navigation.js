import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign, Octicons, FontAwesome } from '@expo/vector-icons';
import {Observer, observer} from 'mobx-react'
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
import WelcomeScreen from './Screens/WelcomeScreen'
import Video from './Screens/VideoScreen'
import Help from './Screens/HelpScreen'



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const ProfileScreens=()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name="profile" component={ProfileScreen} options={{headerTitle:"User Profile", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="addItem" component={AddItem} options={{headerTitle:"Add Item", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="deleteItem" component={DeleteItem} options={{headerTitle:"delete Item", headerStyle:{backgroundColor:'#3ba8e7'}}} />
      <Stack.Screen name="statistics" component={Statistics} options={{headerTitle:"Statistics", headerStyle:{backgroundColor:'#3ba8e7'}}} />  
    </Stack.Navigator>
  )
}

const TabNavigator =()=> {


  return(
    <Tab.Navigator tabBarOptions={{activeTintColor:'#00dd00'}}>

        <Tab.Screen name="Home"  component={HomeScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="md-home" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="Video" component={Video} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="tv" size={size} color={color} />
          ),
        }}
        />

        <Tab.Screen name="location" component={LocationScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="map-marker" color={color} size={size} />
          ),
        }}
        />

        <Tab.Screen name="Orders" component={OrderScreen} options={{
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
  )
}

const Navigation = observer( ({loggedin})=>{
     

  const HeaderRightButton =({navigation})=>{
        
    return(
      <Observer>{()=>
        <TouchableOpacity style={{ width: 28, height: 28, marginHorizontal:20 }}
        onPress={()=> navigation.navigate('cart')}>
          <AntDesign name="shoppingcart" color={"#000"} size={28} />
            {store.numOfProductInCart > 0 && (
            <View
              style={{
                position: 'absolute',
                right: -6,
                top: -3,
                backgroundColor: 'red',
                borderRadius: 6,
                width: 15,
                height: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
                {store.numOfProductInCart}
              </Text>
            </View>
            )}
        </TouchableOpacity>
      }</Observer>
    )
  }
      
  return(
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName={loggedin? "tabNavigation": "welcome"}>
        <Stack.Screen name="welcome" component={WelcomeScreen} options={{animationTypeForReplace: 'pop', headerShown: false}}/>

        <Stack.Screen name="tabNavigation" component={TabNavigator} options={({navigation})=> ({ headerStyle:{backgroundColor:'#33dd33'}, headerTitle:"Farmer", headerRight: ()=>( <HeaderRightButton navigation={navigation}/>)})}/>

        <Stack.Screen name="Section" component={SectionScreen} options={({route, navigation})=> ({headerTitle:route.params.pageTitle, headerStyle:{backgroundColor:'#33dd33'}, headerRight: ()=>( <HeaderRightButton navigation={navigation}/>)})} />
        <Stack.Screen name="cart" component={CartScreen} options={({navigation})=> ({ headerStyle:{backgroundColor:'#33dd33'}, headerTitle:"Cart", headerRight: ()=>( <HeaderRightButton navigation={navigation}/>)})}/>

        <Stack.Screen name="login" component={LoginScreen} options={{headerTitle:"User Profile", headerStyle:{backgroundColor:'#3ba8e7'}}} />

        <Stack.Screen name="help" component={Help} options={{headerTitle:"Help", headerStyle:{backgroundColor:'#3ba8e7'}}} />

      </Stack.Navigator>
 
    </NavigationContainer>
    
    
  );
})


export default Navigation;
