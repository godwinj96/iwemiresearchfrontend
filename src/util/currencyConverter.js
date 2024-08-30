// utils/currencyConverter.js

import axios from "axios";
import { useCurrency } from "../Context/CurrencyContext";

const API_KEY = "1759140c85c332474d822350d25b4eda"; // Replace with your actual API key
const BASE_URL = "https://api.exchangeratesapi.io/v1/";


export const getRates = async (base) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/latest?access_key=${API_KEY}&base=${base}&symbols=GBP,JPY,EUR,AUD,CAD,CHF,CNY,INR,ZAR`
    );


    if (res.data.success) {
      const { rates } = res.data;
      console.log(rates);
      const ratesTemp = [];
      for (const [symbol, rate] of Object.entries(rates)) {
        ratesTemp.push({ symbol, rate });
      }
      return ratesTemp; // Return rates
    } else {
      console.error("Failed to fetch conversion rate:", res.data.error);
      return null;
    } // Return rates


  } catch (error) {
    console.error("Error fetching conversion rate:", error);
    return null;
  }
};
