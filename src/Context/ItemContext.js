import React from 'react'

export default React.createContext({
    items:[],
    itemsNum:0,
    addItem: item => setItem(item),
    removeItem: item => setItemNum(item)
})