import {observable, action, computed} from 'mobx'

class Store{

    @observable text = "Mobx new"
    @observable products = []
    @observable token = "none"
    @observable isSeller = true
    @observable sellerItems = []
    @observable renderSection = null
    @observable renderSellerItems = null
    @observable isWelcomeScreen = true


    @action addProductsToProductsList =(list)=>{
        this.products = list
    }
    @action deleteProductFormCart =(id)=>{
        this.products.forEach((item)=>{
            if(item.id === id){
                item.pieces = 0
                item.select = false
            }
        })
        this.renderSection = new Date()
    }
    @action increaseProductItems =(id)=>{
        this.products.forEach((item)=>{
            if(item.id === id){
                item.pieces++
            }
        })
        this.renderSection = new Date()
    }
    @action decreaseProductItems =(id)=>{
        this.products.forEach((item)=>{
            if(item.id === id && item.pieces > 1){
                item.pieces--
            }
        })
        this.renderSection = new Date()
    }
    @action addProductToCart =(id)=>{
        this.products.forEach((item)=>{
            if(item.id === id){
                item.select = true
                item.pieces = 1
            }
        })
        this.renderSection = new Date()
    }
    @action changeText =(text)=>{
        this.text = text
    }
    @action addSellerItem =(item)=>{
        this.sellerItems.push(item)
    }
    @action deleteSellerItem =(name)=>{
        this.sellerItems = this.sellerItems.filter(item => item.name != name)
        this.renderSellerItems = new Date()
    }


    @computed get getProducts(){
        return this.products.slice()
    }
    @computed get numOfProductInCart(){
        const itemNum = this.products.filter((item)=> item.select)
        return itemNum.length
    }

}

const store = new Store()
export default store