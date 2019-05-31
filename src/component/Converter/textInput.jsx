import React from 'react';
/**
 * @description - Get the user input and save to state
 *
 * @function GetUserInput
 *
 * @returns {jsx} react elements
 *
 */
const GetUserInput = ({ handleCurrencyInputChange }) => {
  return (<>
    <p>Enter Amount to Convert</p>
    <input
      className="text-area"
      placeholder="Enter Amount to Convert"
      type="number"
      defaultValue="1"
      onChange={handleCurrencyInputChange}
    />
  </>);
};
export default GetUserInput;
