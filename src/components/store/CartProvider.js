import React, { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState= {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action)=> {
    if(action.type ==="ADD"){
        const newTotalAmount = state.totalAmount + action.item.price * action.item.amount
        const existingItemIndex = state.items.findIndex(item =>item.id === action.item.id)
        const existingItem = state.items[existingItemIndex]
        let updatedItems
        if(existingItem){
            const updatedItem ={...existingItem, amount: existingItem.amount + action.item.amount}
            updatedItems = [...state.items]
            updatedItems[existingItemIndex] = updatedItem
        }else {
            updatedItems = state.items.concat(action.item)
        }
        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
        }
    }
    if(action.type ==="REMOVE"){
        const removeItemIndex = state.items.findIndex(item =>item.id === action.id)
        const removeItem = state.items[removeItemIndex]
        const newTotalAmount = state.totalAmount - removeItem.price
        const updatedItemAmount = removeItem.amount - 1
        let updatedItems = [...state.items]
        if(updatedItemAmount >= 1){
            const updatedItem ={...removeItem , amount: updatedItemAmount}
            updatedItems[removeItemIndex] = updatedItem
        }else {
            updatedItems = updatedItems.filter(item => item.id !==action.id)
        }

        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
        }
    }
    if(action.type ==="CLEAR"){
        return defaultCartState
    }
    return defaultCartState
}

const CartProvider=(props)=>{
   const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
    const addItemHandler = (item) =>{
        dispatchCartAction({
            type: "ADD",
            item: item
        })
    }
    const removeItemHandler = (id) =>{
        dispatchCartAction({
            type: "REMOVE",
            id: id
        })
    }
    const clearCartHandler=()=>{
        dispatchCartAction({
            type: "CLEAR"
        })
    }
    
return (
    <CartContext.Provider
    value={{
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clear: clearCartHandler,
    }}>{props.children}</CartContext.Provider>
)
}

export default CartProvider