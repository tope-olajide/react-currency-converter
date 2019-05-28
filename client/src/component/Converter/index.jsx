import React, { useState } from "react";

import listOfCurrencies from "./listOfCurrencies";
const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState({
    name: "Nigeria Naira",
    value: "NGN"
  });
  const [toCurrency, setToCurrency] = useState({
    label: "USA Dollar",
    value: "USD"
  });
  const currencyList = listOfCurrencies.map(currency => {
    return <option value={currency.value}  name={currency.label}>{currency.label}</option>;
  });
  const handleFromCurrencyChange = (event)=>{
    setFromCurrency({value:event.target.value});
    console.log(fromCurrency)
  }
  return (
    <>
      <div class="container">
        <div class="converter-box">
          <h3 class="title">Currency Converter</h3>
          <input
            class="text-area"
            placeholder="Enter Amount to Convert"
            type="text"
          />
          <div class="selector-container">
            <div>
              <p>From</p>
              <select
                class="selector"
                name={fromCurrency.value}
                value={fromCurrency.value}
                onChange={handleFromCurrencyChange}
              >
                {currencyList}
              </select>
            </div>
            <div>
              <p>To</p>
              <select class="selector">{currencyList}</select>
            </div>
          </div>
          <p class="conversion_output">0</p>
          <p class="conversion_output-summary">
            1 Trinidad/Tobago Dollar equals 2345.344 Euro
          </p>
        </div>
      </div>
    </>
  );
};
export default CurrencyConverter;
