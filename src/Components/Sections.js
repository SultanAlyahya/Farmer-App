import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Sections(props){
    return(
      <TouchableOpacity style={{height:150, backgroundColor:'#ffffff', borderRadius:20, flexDirection:'row', margin:5}} 
      onPress={()=> props.navigation.navigate('Section',{pageTitle:props.pageTitle})}>
        
        <View style={{width:90, fontSize:30, justifyContent:'center', paddingLeft:10}}>
          <Text style={{fontSize:30}}>{props.logo}</Text>
        </View>

        <View style={{flex:1, backgroundColor:'#22aa22', borderTopRightRadius:20, borderBottomRightRadius:20, justifyContent:'center', paddingLeft:20, backgroundColor:props.color}}>
        <Text style={{fontSize:30}}>{props.title}</Text>
      </View>

    </TouchableOpacity>
    );
}

