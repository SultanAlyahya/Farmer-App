import {AsyncStorage} from 'react-native'

const USER_KEY = 'UserData'

export const saveUserData =async(user)=>{
    try{
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        return true
    }catch(error){
        console.log('fail to login')
        return false
    }

}

export const loadUserData =async()=>{
    try{
        const userData = await AsyncStorage.getItem(USER_KEY)
        if(!userData)
            return false
        const toJ = JSON.parse(userData)
        return toJ
    }catch(error){
        console.log('fail to login')
        return false
    }

}

export const deleteUserInfo =async()=>{
    try{
       await AsyncStorage.removeItem(USER_KEY)
        return true
    }catch(error){
        console.log('fail to logout')
        return false
    }

}