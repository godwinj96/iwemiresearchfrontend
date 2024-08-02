/* eslint-disable */
import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types';
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