/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { useCurrency } from '../../Context/CurrencyContext';


const Currency = ({ onCurrencyChange }) => {

    const { currencyCode, setCurrencyCode,handleCurrencyChange,currencies } = useCurrency();
     const [localCurrencyCode, setLocalCurrencyCode] = useState(currencyCode);
    

    const currencyChange =(event)=>{
        
        const selectedCurrencyCode = event.target.value;
        setLocalCurrencyCode(selectedCurrencyCode); // Update local state
        setCurrencyCode(selectedCurrencyCode); // Update context state
        localStorage.setItem("currency", selectedCurrencyCode);
        handleCurrencyChange(selectedCurrencyCode);
    }

    
   //setCurrencyCode(localStorage.getItem("currency"))
   

    useEffect(() => {
        // Load currency from localStorage
        const savedCurrency = localStorage.getItem("currency");
        if (savedCurrency) {
            setLocalCurrencyCode(savedCurrency);
            setCurrencyCode(localCurrencyCode); // Sync context state with local storage value
        }
    }, [setCurrencyCode]);




    return (
        <div className="w-3/4 p-2 mx-auto mb-5 flex flex-col  justify-center">
            <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Currency</label>
            <select
                id="currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                value={localCurrencyCode}
                onChange={currencyChange}
                required
            >
                <option value="" disabled>Select your currency</option>
                {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                        {currency.name} ({currency.code})
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Currency