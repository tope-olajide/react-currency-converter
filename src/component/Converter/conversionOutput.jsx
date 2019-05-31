import React from 'react';
/**
 * @description - Displays the conversion result
 *
 * @function ConversionOutput
 *
 * @returns {jsx} react elements
 *
 */
const ConversionOutput = ({
  isLoading,
  conversionResults,
  isError,
  amountToConvert,
  baseCurrencyName,
  quoteCurrencyName
}) => {
  return (
    <>
      <p className="conversion_output">{isLoading || isError ? '' : conversionResults}</p>
      <p className="conversion_output-summary">
        {isLoading /* if the page is loading show loading animation */ ? (
          <i
            className="fa fa-spinner fa-spin"
            style={{ 'font-size': '40px' }}
          />
        ) : (
          ''
        )}
        {!isLoading &&
        !isError /* if the page is not loading and there's no error, show the output summary */
          ? `${amountToConvert} ${baseCurrencyName} equals ${conversionResults} ${quoteCurrencyName}`
          : ''}
        <br />
        {isError /* if theres error, show error message */
          ? 'Unable to connect, please check your internet connection and try again'
          : ''}
      </p>
    </>
  );
};
export default ConversionOutput;
