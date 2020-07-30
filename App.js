import React, {useEffect, useState} from 'react';
import Navigation from './src/Navigation'
import * as SplashScreen from 'expo-splash-screen';
import userStore from './src/Mobx/userStore'
import 'mobx-react-lite/batchingForReactNative'
//import {Provider} from 'react-redux'

//import configureStore from './src/Redux/Store'

//const store = configureStore()

export default function App(){

  const [loaded, setLoaded]  = useState(false)
  const [loggedin, setLoggedin] = useState(false)

  useEffect(()=>{
  
    (async()=>{
      try {
        await SplashScreen.preventAutoHideAsync();
        const load = await userStore.load()
        console.log('is loaded:',load)
        setLoggedin(load)
        setLoaded(true)
      } catch (e) {
        console.log(e);
      }
    })()
    
  }, [])
  return(
    loaded?
    <Navigation loggedin={loggedin}/>
    :
    <></>
  )
}