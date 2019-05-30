import React, { useState, useEffect } from 'react';
import axios from 'axios';
import listOfCurrencies from './listOfCurrencies';
/**
 * @description - Currency converter functional component
 *
 * @function CurrencyConverter
 *
 * @returns {void} nothing
 *
 */
const CurrencyConverter = () => {
  const [amountToConvert, setAmountToConvert] = useState(1);
  const [fromCurrency, setFromCurrency] = useState({
    value: 'USD'
  });
  const [toCurrency, setToCurrency] = useState({
    value: 'NGN'
  });
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [conversionResults, setConversionResults] = useState('');
  useEffect(() => {
    /**
     * @description - handles the currency conversion any time the amountToConvert, fromCurrency, toCurrency state changes
     *
     * @function handleCurrencyConversion
     *
     * @returns {void} nothing
     *
     */
    const handleCurrencyConversion = () => {
      setIsloading(true);
      setIsError(false);
      axios
        .get(
          `https://free.currconv.com/api/v7/convert?q=${fromCurrency.value}_${
            toCurrency.value
          }&compact=ultra&apiKey=c219dc5827286852c542`
        )
        .then((response) => {
          setIsloading(false);
          setIsError(false);
          const { data } = response;
          const result = amountToConvert * Object.values(data)[0];
          setConversionResults(result);
        })
        .catch((err) => {
          setIsError(true);
          setIsloading(false);
          console.log('Error: ', err.message);
        });
    };
    handleCurrencyConversion();
  }, [amountToConvert, fromCurrency, toCurrency]);

  // currencyList is used to generate all currencies displayed using the select tag.
  const currencyList = listOfCurrencies.map(currency => (
    <option value={currency.value}>{currency.label}</option>
  ));

  /**
   * @description - function used to get full currency name from listOfCurrencies file.
   *
   * @function getFullCurrencyName
   *
   * @returns {Array} currency.value
   *
   * @returns {boolean} true of false
   *
   * @param {string} currencyAcronym - the currency acronym that will be used to search for the currency name
   */
  const getFullCurrencyName = currencyAcronym => listOfCurrencies.filter((currency) => {
    if (currency.value === currencyAcronym) {
      return currency.value;
    }
    return false;
  });
  /**
   * @description - Saves the input value to amountToConvert state onChange
   *
   * @function handleCurrencyInputChange
   *
   * @param {event} event
   *
   * @returns {method} setAmountToConvert
   *
   */
  const handleCurrencyInputChange = (event) => {
    setAmountToConvert(event.target.value);
  };
  /**
   * @description - set the selected input value to fromCurrency state onChange
   *
   * @function handleFromCurrencyChange
   *
   * @param {event} event
   *
   * @returns {method} setFromCurrency
   *
   */
  const handleFromCurrencyChange = (event) => {
    setFromCurrency({ value: event.target.value });
  };
  /**
   * @description - set the selected input value to toCurrency state onChange
   *
   * @function handleToCurrencyChange
   *
   * @param {event} event
   *
   * @returns {method} setToCurrency
   *
   */
  const handleToCurrencyChange = (event) => {
    setToCurrency({ value: event.target.value });
  };
  // getFullCurrencyName function returns an array of json.
  // the [0].label select the first index,and the value of the label,then save into the provided variable.
  const baseCurrencyName = getFullCurrencyName(fromCurrency.value)[0].label;
  const quoteCurrencyName = getFullCurrencyName(toCurrency.value)[0].label;

  return (
    <>
      <div className="container">
        <div className="converter-box">
          <h3 className="title">Currency Converter</h3>
          <p>Enter Amount to Convert</p>
          <input
            className="text-area"
            placeholder="Enter Amount to Convert"
            type="text"
            defaultValue="1"
            onChange={handleCurrencyInputChange}
          />
          <div className="selector-container">
            <div>
              <p>From</p>
              <select
                className="selector"
                value={fromCurrency.value}
                onChange={handleFromCurrencyChange}
              >
                {currencyList}
              </select>
            </div>
            <div>
              <p>To</p>
              <select
                className="selector"
                value={toCurrency.value}
                onChange={handleToCurrencyChange}
              >
                {currencyList}
              </select>
            </div>
          </div>
          <p className="conversion_output">
            {isLoading ? '' : conversionResults}
          </p>
          <p className="conversion_output-summary">
            {isLoading ? (/* if the page is loading show loading animation */
              <i
                className="fa fa-spinner fa-spin"
                style={{ 'font-size': '40px' }}
              />
            ) : (
              ''
            )}
            {!isLoading && !isError/* if the page is not loading and there's no error, show the output summary */
              ? `${amountToConvert} ${baseCurrencyName} equals ${conversionResults} ${quoteCurrencyName}`
              : ''}
            <br />
            {isError/* if theres error, show error message */
              ? 'Unable to connect, please check your internet connection and try again'
              : ''}
          </p>
        </div>
      </div>
    </>
  );
};
export default CurrencyConverter;
