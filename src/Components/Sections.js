import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Sections(props){
    return(
      <TouchableOpacity style={styles.sectionItems} 
      onPress={()=> props.navigation.navigate('Section',{pageTitle:props.pageTitle})}>
        
        <View style={styles.sectionLogoContainer}>
          <Text style={styles.sectionLogo}>{props.logo}</Text>
        </View>

        <View style={{...styles.sectionBody, backgroundColor:props.color}}>
        <Text style={styles.sectionLogo}>{props.title}</Text>
      </View>

    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    sectionItems:{
        width:'98%',
        height:150,
        //margin:5,
        backgroundColor:'#ffffff',
        borderRadius:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
      },
    sectionLogoContainer:{
        width:'33%',
        height:'100%',
        fontSize:30,
        justifyContent:'center',
        alignItems:'center'
      },
      sectionLogo:{
        fontSize:30,
      },
      sectionBody:{
        width:'67%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#22aa22',
        borderTopRightRadius:20,
        borderBottomRightRadius:20
      },
      sectionTextContainer:{
        height:40,
        width:'100%',
      }
})