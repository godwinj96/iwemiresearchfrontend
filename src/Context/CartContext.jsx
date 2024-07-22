import React, { createContext, useContext, useReducer } from 'react'



const CartContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            return {
                ...state, // Spread the current state
                items: [...state.items, action.payload], // Add the new item to the items array
                count: state.count + 1, // Increment the count
            };
        case 'REMOVE_FROM_CART':
            const filteredItems = state.items.filter((item, index) => index !== action.payload);
            return {
                ...state,
                items: filteredItems,
                count: state.count - 1,
            };
        default:
            return state; // Return the current state for unhandled actions
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [], count: 0 })

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => useContext(CartContext)

export default CartProvider
