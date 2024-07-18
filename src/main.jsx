import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import GlobalStateProvider from './Context/GlobalState.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>

  </BrowserRouter>,
)
