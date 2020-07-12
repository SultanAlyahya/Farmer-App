import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';

const win = Dimensions.get('window')
const WRatio = win.width
const containerWidth = WRatio*0.75

function LoginScreen({navigation}){

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return(
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.logo}>login</Text>
                <View>
                    <Text style={styles.lable}>Name</Text>
                    <TextInput style={styles.textField}
                    placeholder="Name"
                    onChangeText={(text)=>setName(text)}/>

                    <Text style={styles.lable}>Email</Text>
                    <TextInput style={styles.textField}
                    placeholder="Email"
                    onChangeText={(text)=>setEmail(text)}
                    textContentType='emailAddress'/>

                    <Text style={styles.lable}>Password</Text>
                    <TextInput style={styles.textField}
                    placeholder="Password"
                    onChangeText={(text)=>setPassword(text)}
                    textContentType="password"
                    secureTextEntry={true}/>

                    <TouchableOpacity style={styles.loginButton}
                    onPress={()=> navigation.navigate('profile')}>
                        <Text style={styles.textButton}>login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#dddddd'
    },
    infoContainer:{
        width:containerWidth,
        height:containerWidth*2,
        backgroundColor:'#ffffff',
        borderRadius:20,
        // justifyContent:'space-around',
        alignItems:'center',
        padding:20
    },
    logo:{
        fontSize:50,
        margin:10
    },
    textField:{
        width:containerWidth-40,
        height:containerWidth/6,
        //borderWidth:1,
        //borderColor:'#000000',
        backgroundColor:'#f3f3f3',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#000000',
        padding:5,
        fontSize:25
    },
    lable:{
        fontSize:30,
        marginTop:20,
    },
    loginButton:{
        width:containerWidth-40,
        height:containerWidth/6+10,
        backgroundColor:'#3ba8e7',
        marginTop:containerWidth/6,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    textButton:{
        fontSize:35,
        color:'#ffffff'
    }
})

export default LoginScreen;