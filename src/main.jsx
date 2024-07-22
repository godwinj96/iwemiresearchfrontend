import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

import GlobalStateProvider from './Context/GlobalState.jsx'
import { CurrencyProvider } from './Context/CurrencyContext.jsx'
import CartProvider from './Context/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CartProvider>
     <CurrencyProvider>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </CurrencyProvider>
  </CartProvider>
   


  </BrowserRouter>,
)
