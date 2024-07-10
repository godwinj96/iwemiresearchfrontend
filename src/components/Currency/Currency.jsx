import React, { useState } from 'react'

const Currency = () => {

    const currencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan Renminbi' },
        { code: 'SEK', name: 'Swedish Krona' },
        { code: 'NZD', name: 'New Zealand Dollar' },
        { code: 'MXN', name: 'Mexican Peso' },
        { code: 'SGD', name: 'Singapore Dollar' },
        { code: 'HKD', name: 'Hong Kong Dollar' },
        { code: 'NOK', name: 'Norwegian Krone' },
        { code: 'KRW', name: 'South Korean Won' },
        { code: 'TRY', name: 'Turkish Lira' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'RUB', name: 'Russian Ruble' },
        { code: 'BRL', name: 'Brazilian Real' },
        { code: 'ZAR', name: 'South African Rand' },
        { code: 'PHP', name: 'Philippine Peso' },
        { code: 'CZK', name: 'Czech Koruna' },
        { code: 'PLN', name: 'Polish Zloty' },
        { code: 'DKK', name: 'Danish Krone' },
        { code: 'HUF', name: 'Hungarian Forint' },
        { code: 'MYR', name: 'Malaysian Ringgit' },
        { code: 'IDR', name: 'Indonesian Rupiah' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'ILS', name: 'Israeli Shekel' },
        { code: 'CLP', name: 'Chilean Peso' },
        { code: 'PHP', name: 'Philippine Peso' },
        { code: 'AED', name: 'United Arab Emirates Dirham' },
        { code: 'COP', name: 'Colombian Peso' },
        { code: 'SAR', name: 'Saudi Riyal' },
        { code: 'RON', name: 'Romanian Leu' },
        { code: 'EGP', name: 'Egyptian Pound' },
        { code: 'NGN', name: 'Nigerian Naira' },
        { code: 'BDT', name: 'Bangladeshi Taka' },
        { code: 'PKR', name: 'Pakistani Rupee' },
        { code: 'TWD', name: 'New Taiwan Dollar' },
        { code: 'ARS', name: 'Argentine Peso' },
        { code: 'KZT', name: 'Kazakhstani Tenge' },
        { code: 'UAH', name: 'Ukrainian Hryvnia' },
        { code: 'QAR', name: 'Qatari Riyal' },
        { code: 'PEN', name: 'Peruvian Sol' },
        { code: 'VEF', name: 'Venezuelan Bolívar' },
        { code: 'MAD', name: 'Moroccan Dirham' },
        { code: 'DZD', name: 'Algerian Dinar' },
        { code: 'OMR', name: 'Omani Rial' },
    ];


    return (
        <div className="max-w-sm mx-auto mb-5">
            <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Currency</label>
            <select
                id="currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required

            >
                <option value="" disabled selected>Select your currency</option>
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