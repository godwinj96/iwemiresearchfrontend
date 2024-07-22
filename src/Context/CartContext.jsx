import React, { createContext, useContext, useReducer } from 'react'

const CartContext = createContext()

const initialState = {
    items: [],
    count: 0
}

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    items: updatedItems,
                    count: state.count + 1,
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                    count: state.count + 1,
                };
            }
        case 'REMOVE_FROM_CART':
            const filteredItems = state.items.filter((item, index) => index !== action.payload);
            return {
                ...state,
                items: filteredItems,
                count: state.count - 1,
            };
        case 'DECREASE_QUANTITY':
            const itemIndex = state.items.findIndex((item, index) => index === action.payload);
            if (state.items[itemIndex].quantity === 1) {
                const newItems = state.items.filter((item, index) => index !== action.payload);
                return {
                    ...state,
                    items: newItems,
                    count: state.count - 1,
                };
            } else {
                const updatedItemsDecrease = [...state.items];
                updatedItemsDecrease[itemIndex].quantity -= 1;
                return {
                    ...state,
                    items: updatedItemsDecrease,
                    count: state.count - 1,
                };
            }
        default:
            return state; // Return the current state for unhandled actions
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => useContext(CartContext)

export default CartProvider
