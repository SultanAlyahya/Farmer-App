import {observable, action, computed} from 'mobx'
import {loadUserData, deleteUserInfo, saveUserData} from '../db/userdb'


class UserStore{

    @observable token = ""
    @observable isSeller = false
    @observable userName = ""


    @action load =async()=>{
        const user = await loadUserData()
        console.log(user)
        if(user){
            this.userName = user.name
            this.token = user.token
            this.isSeller = user.isSeller
            return true
        }
        return false
    }
    @action login =async(user)=> {
        try{
            this.token = user.token
            this.userName = user.name
            this.isSeller = user.isSeller
            await saveUserData(user)
            return true
        }catch(error){
            return false
        }
    }
    @action logout =async()=>{
        try{
            await deleteUserInfo()
            this.token = ""
            this.userName = ""
            this.isSeller = false
            return true
        }catch(error){
            console.log(error)
            return false
        }
    }
    @action modifyUserData = ()=> {

    } 

    @computed get getToken(){
        if(this.token)
            return this.token
        return ''
    }
    @computed get getUserName(){
        if(this.userName)
            return this.userName
        return ''
    }
}

const store = new UserStore()
export default store
 