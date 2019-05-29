import React, { useState, useEffect } from "react";
import axios from "axios";
import listOfCurrencies from "./listOfCurrencies";
const CurrencyConverter = () => {
  const [amountToConvert, setAmountToConvert] = useState(1);
  const [fromCurrency, setFromCurrency] = useState({
    value: "USD"
  });
  const [toCurrency, setToCurrency] = useState({
    value: "NGN"
  });
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const handleCurrencyConversion = () => {
      setIsloading(true);
      setIsError(false);
      axios
        .get(
          `https://free.currconv.com/api/v7/convert?q=${fromCurrency.value}_${
            toCurrency.value
          }&compact=ultra&apiKey=c219dc5827286852c542`
        )
        .then(response => {
          setIsloading(false);
          setIsError(false);
          const { data } = response;
          console.log(data);
          console.log(Object.values(data)[0]);
          const result = amountToConvert * Object.values(data)[0];
          setConversionResults(result);
        })
        .catch(err => {
          setIsError(true);
          console.log("Error: ", err.message);
        });
    };
    handleCurrencyConversion();
  }, [amountToConvert, fromCurrency, toCurrency]);

  const [conversionResults, setConversionResults] = useState("");
  const currencyList = listOfCurrencies.map(currency => {
    return <option value={currency.value}>{currency.label}</option>;
  });
  const getFullCurrencyName = currencyAcronym => {
    return listOfCurrencies.filter(currency => {
      if (currency.value === currencyAcronym) {
        return currency.value;
      }
      return false;
    });
  };

  const handleCurrencyInputChange = event => {
    setAmountToConvert(event.target.value);
  };
  const handleFromCurrencyChange = event => {
    setFromCurrency({ value: event.target.value });
  };
  const handleToCurrencyChange = event => {
    setToCurrency({ value: event.target.value });
  };
  const baseCurrencyName = getFullCurrencyName(fromCurrency.value[0].label);
  const quoteCurrencyName = getFullCurrencyName(toCurrency.value[0].label);

  return (
    <>
      <div class="container">
        <div class="converter-box">
          <h3 class="title">Currency Converter</h3>
          <p>Enter Amount to Convert</p>
          <input
            class="text-area"
            placeholder="Enter Amount to Convert"
            type="text"
            defaultValue="1"
            onChange={handleCurrencyInputChange}
          />
          <div class="selector-container">
            <div>
              <p>From</p>
              <select
                class="selector"
                value={fromCurrency.value}
                onChange={handleFromCurrencyChange}
              >
                {currencyList}
              </select>
            </div>
            <div>
              <p>To</p>
              <select
                class="selector"
                value={toCurrency.value}
                onChange={handleToCurrencyChange}
              >
                {currencyList}
              </select>
            </div>
          </div>
          <p class="conversion_output">{isLoading ? "" : conversionResults}</p>
          <p class="conversion_output-summary">
            {isLoading ? (
              <i
                class="fa fa-spinner fa-spin"
                style={{ "font-size": "40px" }}
              />
            ) : (
              `${amountToConvert} ${baseCurrencyName} equals ${conversionResults} ${quoteCurrencyName}`
            )}
            <br />
            {isError
              ? `Unable to connect, please check your internet connection and try again`
              : ""}
          </p>
        </div>
      </div>
    </>
  );
};
export default CurrencyConverter;
