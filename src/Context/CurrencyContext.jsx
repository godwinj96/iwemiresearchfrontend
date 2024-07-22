import React, { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

 export const CurrencyProvider = ({children}) => {

    const [ currencyCode, setCurrencyCode] = useState('NGN')

  return (
    <CurrencyContext.Provider value={{currencyCode, setCurrencyCode}}>
        {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = ()=> useContext(CurrencyContext)