export const addItem =(item)=>({
        type:'ADD_ITEM',
        data:item
    })

export const deleteItem =(id)=>({
    type:'DELETE_ITEM',
    id:id
})

export const plusItem =(id)=>({
    type:'PLUS_ITEM',
    id:id
})

export const minusItem =(id)=>({
    type:'MINUS_ITEM',
    id:id
})

export const changeStatus =(id)=>({
    type:'CHANGE_STATUS',
    id:id
})