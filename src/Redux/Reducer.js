const initialState={
    items:[],
    itemsSelected:[]
}

const itemReducer = (state = initialState, action)=>{
    switch(action.type){
        // case 'ADD_ITEM':
        //     return{
        //         ...state,
        //         items:state.items.concat({
        //             name:action.data.name,
        //             price:action.data.price,
        //             id:action.data.id,
        //             select:action.data.select,
        //             pieces: action.data.pieces
        //     })}
        case 'ADD_ITEM':
            return{
                ...state,
                items:action.data
            }
        case 'DELETE_ITEM':
            return{
                ...state,
                items: state.items.map((item)=>{
                    if(item.id === action.id){
                        item.pieces = 0
                        item.select=false
                        return item
                    }
                    return item
                })
            }
        case 'PLUS_ITEM':
            //console.log(action)
            return{
                ...state,
                items: state.items.map((item)=>{
                    if(item.id === action.id){
                        item.pieces = item.pieces+1
                        return item
                    }
                    return item
                })
            }
            case 'MINUS_ITEM':
                //console.log(action)
                return{
                    ...state,
                    items: state.items.map((item)=>{
                        if(item.id === action.id && item.pieces !== 1){
                            item.pieces = item.pieces-1
                            return item
                        }
                        return item
                    })
                } 
                case 'CHANGE_STATUS':
                //console.log(action)
                return{
                    ...state,
                    items: state.items.map((item)=>{
                        if(item.id === action.id){
                            item.pieces = item.pieces+1
                            item.select=true
                            return item
                        }
                        return item
                    })
                }           
        default:
            return state;
    }
}

export default itemReducer;