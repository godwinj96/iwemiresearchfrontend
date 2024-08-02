/* eslint-disable */
import React from 'react'
import { useCurrency } from '../../Context/CurrencyContext';

const Currency = ({ onCurrencyChange }) => {

    const { currencyCode, setCurrencyCode } = useCurrency();

    const currencies = [
        { code: 'US', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'GHS', name: 'Ghanaian Cedi' },
        { code: 'XAF', name: 'Central African Franc' },
        { code: 'XOF', name: 'West African Franc' },
        { code: 'ZAR', name: 'South African Rand' },
        { code: 'MWK', name: 'Malawian Kwacha' },
        { code: 'KES', name: 'Kenyan Shilling' },
        { code: 'UGX', name: 'Ugandan Shilling' },
        { code: 'RWF', name: 'Rwandan Franc' },
        { code: 'TZS', name: 'Tanzanian Shilling' },
        { code: 'NGN', name: 'Nigerian Naira' }
    ];

    

    const handleCurrencyChange = (event) => {
        const selectedCurrencyCode = event.target.value;
        const selectedCurrencyNumber = currencies.find(currency => currency.code === selectedCurrencyCode)?.number;
        setCurrencyCode(selectedCurrencyCode);
        onCurrencyChange(selectedCurrencyNumber);
    };



    return (
        <div className="max-w-sm mx-auto mb-5">
            <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Currency</label>
            <select
                id="currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={currencyCode}
                onChange={handleCurrencyChange}
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