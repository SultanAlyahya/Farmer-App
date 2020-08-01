import React, {useRef, useState} from 'react'
import {View, TouchableOpacity, Text, Animated, Dimensions, ActivityIndicator} from 'react-native'
import { WebView } from 'react-native-webview';
import { Video } from 'expo-av';


const {width, height} = Dimensions.get('window')

const VideoS =()=>{

    const [play, setPlay] = useState({play: false, uri:''})

    const currentVideo = useRef(new Animated.Value(0)).current

    const movePageUp =(url)=>{
        console.log('play')
        setPlay({play: true, uri: url})
        Animated.timing(currentVideo,{
            toValue: -height,
            duration: 500,
            useNativeDriver: true
        }).start()
    }
    const movePageDown =()=>{
        Animated.timing(currentVideo,{
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(()=> setPlay({play: false, uri:''}))
    }

    //=====CurrentPage Component==============================
    const CurrentPage =()=>{
        return(
            <Animated.View style={[{position: 'absolute', backgroundColor: '#fff', top:height, width: width, height: height}, {transform:[{translateY: currentVideo}]}]}>
                
                
                <TouchableOpacity style={{padding:10}}
                onPress={()=> movePageDown()}>
                    <Text style={{fontSize: 30}}>Close</Text>
                </TouchableOpacity>
                
                {play.play?
                <WebView source={{ uri: play.uri }} style={{ marginTop: 20,width:'100%', height:'80%' }}
                scrollEnabled={false}
                allowsFullscreenVideo={true}
                startInLoadingState={true}
                renderLoading={()=>
                <View style={{width:'100%', height:'80%', alignItems:'center', justifyContent:'center', position:'absolute'}}>
                    <ActivityIndicator size={'large'} />
                </View>
                }
                /> 
                :
                <></>
                }
            </Animated.View>
        )
    }

    return(
        <View style={{flex:1, backgroundColor: '#ffffff'}}>
            
            <TouchableOpacity style={{backgroundColor:'#dddddd', margin:5, borderRadius: 20, justifyContent: 'center', flexDirection: 'row'}}
            onPress={()=> movePageUp('https://www.youtube.com/watch?v=PWEd69K8SDk')}>
                <Text style={{fontSize: 30, marginVertical:50}}>the benefits of lettus </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#dddddd', margin:5, borderRadius: 20, justifyContent: 'center', flexDirection: 'row'}}
            onPress={()=> movePageUp('https://www.youtube.com/watch?v=PWEd69K8SDk')}>
                <Text style={{fontSize: 30, marginVertical:50}}>the benefits of lettus </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor:'#dddddd', margin:5, borderRadius: 20, justifyContent: 'center', flexDirection: 'row'}}
            onPress={()=> movePageUp('https://www.youtube.com/watch?v=PWEd69K8SDk')}>
                <Text style={{fontSize: 30, marginVertical:50}}>the benefits of lettus </Text>
            </TouchableOpacity>
          
            <CurrentPage/>
            
            <></>
            
        </View>
    )
}

export default VideoS