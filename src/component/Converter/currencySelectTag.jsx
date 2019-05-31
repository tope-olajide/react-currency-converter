import React from "react";
/**
 * @description - Get the user selected option and save to state
 *
 * @function SelectCurrency
 *
 * @returns {jsx} react elements
 *
 */
const SelectCurrency = ({
  currencyValue,
  handleCurrencyChange,
  currencyList
}) => (
  <>
    <select
      className="selector"
      value={currencyValue}
      onChange={handleCurrencyChange}
    >
      {currencyList}
    </select>
  </>
);
export default SelectCurrency;
