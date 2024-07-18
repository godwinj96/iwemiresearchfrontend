import React, { useState } from 'react'

const Currency = ({onCurrencyChange}) => {

    const currencies = [
        { code: 'USD', name: 'US Dollar', number: 840 },
        { code: 'EUR', name: 'Euro', number: 978 },
        { code: 'JPY', name: 'Japanese Yen', number: 392 },
        { code: 'GBP', name: 'British Pound', number: 826 },
        { code: 'AUD', name: 'Australian Dollar', number: 0o36 },
        { code: 'CAD', name: 'Canadian Dollar', number: 124 },
        { code: 'CHF', name: 'Swiss Franc', number: 756 },
        { code: 'CNY', name: 'Chinese Yuan Renminbi', number: 156 },
        { code: 'SEK', name: 'Swedish Krona', number: 752 },
        { code: 'NZD', name: 'New Zealand Dollar', number: 554 },
        { code: 'MXN', name: 'Mexican Peso', number: 484 },
        { code: 'SGD', name: 'Singapore Dollar', number: 702 },
        { code: 'HKD', name: 'Hong Kong Dollar', number: 344 },
        { code: 'NOK', name: 'Norwegian Krone', number: 578 },
        { code: 'KRW', name: 'South Korean Won', number: 410 },
        { code: 'TRY', name: 'Turkish Lira', number: 949 },
        { code: 'INR', name: 'Indian Rupee', number: 356 },
        { code: 'RUB', name: 'Russian Ruble', number: 643 },
        { code: 'BRL', name: 'Brazilian Real', number: 986 },
        { code: 'ZAR', name: 'South African Rand', number: 710 },
        { code: 'PHP', name: 'Philippine Peso', number: 608 },
        { code: 'CZK', name: 'Czech Koruna', number: 203 },
        { code: 'PLN', name: 'Polish Zloty', number: 985 },
        { code: 'DKK', name: 'Danish Krone', number: 208 },
        { code: 'HUF', name: 'Hungarian Forint', number: 348 },
        { code: 'MYR', name: 'Malaysian Ringgit', number: 458 },
        { code: 'IDR', name: 'Indonesian Rupiah', number: 360 },
        { code: 'THB', name: 'Thai Baht', number: 764 },
        { code: 'ILS', name: 'Israeli Shekel', number: 376 },
        { code: 'CLP', name: 'Chilean Peso', number: 152 },
        { code: 'AED', name: 'United Arab Emirates Dirham', number: 784 },
        { code: 'COP', name: 'Colombian Peso', number: 170 },
        { code: 'SAR', name: 'Saudi Riyal', number: 682 },
        { code: 'RON', name: 'Romanian Leu', number: 946 },
        { code: 'EGP', name: 'Egyptian Pound', number: 818 },
        { code: 'NGN', name: 'Nigerian Naira', number: 566 },
        { code: 'BDT', name: 'Bangladeshi Taka', number: 0o50 },
        { code: 'PKR', name: 'Pakistani Rupee', number: 586 },
        { code: 'TWD', name: 'New Taiwan Dollar', number: 901 },
        { code: 'ARS', name: 'Argentine Peso', number: 0o32 },
        { code: 'KZT', name: 'Kazakhstani Tenge', number: 398 },
        { code: 'UAH', name: 'Ukrainian Hryvnia', number: 980 },
        { code: 'QAR', name: 'Qatari Riyal', number: 634 },
        { code: 'PEN', name: 'Peruvian Sol', number: 604 },
        { code: 'VEF', name: 'Venezuelan Bolívar', number: 937 },
        { code: 'MAD', name: 'Moroccan Dirham', number: 504 },
        { code: 'DZD', name: 'Algerian Dinar', number: 0o12 },
        { code: 'OMR', name: 'Omani Rial', number: 512 },
    ];

    const [selectedCurrency,setSelectedCurrency] = useState('')

    const handleCurrencyChange = (event) => {
        const selectedCurrencyCode = event.target.value;
        const selectedCurrencyNumber = currencies.find(currency => currency.code === selectedCurrencyCode)?.number;
        setSelectedCurrency(selectedCurrencyCode);
        onCurrencyChange(selectedCurrencyNumber);
    };



    return (
        <div className="max-w-sm mx-auto mb-5">
            <label htmlFor="currency" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Currency</label>
            <select
                id="currency"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedCurrency}
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