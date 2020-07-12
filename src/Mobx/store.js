import {observable, action, computed} from 'mobx'

class Store{

    @observable text = "Mobx new"
    @observable list = []
    @observable token = "none"
    @observable isSeller = true
    @observable sellerItems = []


    @action add =(list)=>{
        this.list = list
    }
    @action delete =(id)=>{
        this.list.forEach((item)=>{
            if(item.id === id){
                item.pieces = 0
                item.select = false
            }
        })
    }
    @action plus =(id)=>{
        this.list.forEach((item)=>{
            if(item.id === id){
                item.pieces++
            }
        })
    }
    @action minus =(id)=>{
        this.list.forEach((item)=>{
            if(item.id === id && item.pieces > 1){
                item.pieces--
            }
        })
    }
    @action select =(id)=>{
        this.list.forEach((item)=>{
            if(item.id === id){
                item.select = true
                item.pieces = 1
            }
        })
    }
    @action changeText =(text)=>{
        this.text = text
    }
    @action addSellerItem =(item)=>{
        this.sellerItems.push(item)
    }
    @action deleteSellerItem =(name)=>{
        this.sellerItems = this.sellerItems.filter(item => item.name != name)
    }


    @computed get items(){
        return this.list.slice()
    }
    @computed get selected(){
        const itemNum = this.list.filter((item)=> item.select)
        return itemNum.length
    }

}

const store = new Store()
export default store