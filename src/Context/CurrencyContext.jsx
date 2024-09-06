/* eslint-disable */
import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { getRates } from '../util/currencyConverter';
const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [currencyCode, setCurrencyCode] = useState('NGN')
  const [conversionRate, setConversionRate] = useState(1)
  const currencies = [
    { code: 'USD', name: 'US Dollar' },
    { code: 'GBP', name: 'British Pound' },
    { code: 'CAD', name: 'Canadian Dollar' },
    { code: 'CNY', name: 'Chinese Yuan' },
    { code: 'EUR', name: 'European Euros' },
    { code: 'NGN', name: 'Nigerian Naira' }
    
  ];

  const rates = {
    NGN: 1,        // Base rate
    USD: 0.00063,   // Example rate: 1 NGN = 0.0013 USD
    GBP: 0.00048,    // Example rate: 1 NGN = 0.001 GBP
    CAD: 0.00085,   // Example rate: 1 NGN = 0.0018 CAD
    CNY: 0.0045,
    EUR: 0.00057  // Example rate: 1 NGN = 0.0095 CNY
  };




  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency') || 'NGN'
    setCurrencyCode(savedCurrency)
    setConversionRate(rates[savedCurrency] || 1) // initial rate
  }, [])

  useEffect(() => {
    if (currencyCode) {
      handleCurrencyChange(currencyCode);
      setConversionRate(rates[currencyCode] || 1) // Fetch conversion rate when currency changes
    }
  }, [currencyCode]);

  const handleCurrencyChange = (newCurrencyCode) => {
    setCurrencyCode(newCurrencyCode)
    setConversionRate(rates[newCurrencyCode])
    //console.log(rates[newCurrencyCode])
    //console.log(conversionRate)
    localStorage.setItem("currency", newCurrencyCode);
  };



  return (
    <CurrencyContext.Provider value={{ currencyCode, setCurrencyCode, handleCurrencyChange, currencies, conversionRate }}>
      {children}
    </CurrencyContext.Provider>
  )
}


export const useCurrency = () => useContext(CurrencyContext)