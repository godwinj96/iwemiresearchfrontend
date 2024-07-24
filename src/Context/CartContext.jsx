import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { GlobalStateContext } from './GlobalState';

const CartContext = createContext()

//const {user} = useContext(GlobalStateContext)
const userId = localStorage.getItem('userId')


const getInitialCartState = () => {
   
    const cartItems = localStorage.getItem(`${userId}_cartItems`);
    const cartCount = localStorage.getItem(`${userId}_cartCount`);

    return {
        items: cartItems ? JSON.parse(cartItems) : [],
        count: cartCount ? JSON.parse(cartItems).reduce((acc, item)=> acc + item.quantity,0) : 0,
    };
};

const initialState = getInitialCartState();

const cartReducer = (state, action) => {
    let updatedItems;
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex !== -1) {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;
                return {
                    ...state,
                    items: updatedItems,
                    count: state.count + 1,
                };
            } else {
                updatedItems = [...state.items, { ...action.payload, quantity: 1 }]
                return {
                    ...state,
                    items: updatedItems,
                    count: state.count + 1,
                };
            }
        case 'REMOVE_FROM_CART':
            updatedItems = state.items.filter((item, index) => index !== action.payload);
            return {
                ...state,
                items: updatedItems,
                count: state.count - state.items[action.payload].quantity,
            };
        case 'DECREASE_QUANTITY':
            const itemIndex = state.items.findIndex((item, index) => index === action.payload);
            if (state.items[itemIndex].quantity === 1) {
                updatedItems = state.items.filter((item, index) => index !== action.payload);
                return {
                    ...state,
                    items: updatedItems,
                    count: state.count - 1,
                };
            } else {
                updatedItems = [...state.items];
                updatedItems[itemIndex].quantity -= 1;
                return {
                    ...state,
                    items: updatedItems,
                    count: state.count - 1,
                };
            }

        case 'CLEAR_CART':
            return {
                items: [],
                count: 0
            }
        default:
            return state; // Return the current state for unhandled actions
    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    useEffect(() => {
        localStorage.setItem(`${userId}_cartItems`, JSON.stringify(state.items))
        localStorage.setItem(`${userId}_cartCount`, JSON.stringify(state.count))

    }, [state.items, state.count])
   

    

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => useContext(CartContext)

export default CartProvider
