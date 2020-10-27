import React, { useState, useCallback } from "react";

export const CurrencyContext = React.createContext({});

const initRates = {
  CZK: 1,
  USD: 24,
};

export const CurrencyProvider = ({ children }) => {
  const [rates, setRates] = useState(initRates);

  const setRateForCurrency = useCallback(
    (rate, currencyCode) => {
      setRates((oldRates) => ({ ...oldRates, [currencyCode]: rate }));
    },
    [setRates]
  );

  const convertBaseToCurrency = useCallback(
    (amountInBaseCurrency, currencyCode) => {
      if (!rates[currencyCode]) throw Error("Unknown currency code");

      return amountInBaseCurrency * rates[currencyCode];
    },
    [rates]
  );
  return (
    <CurrencyContext.Provider
      value={{ setRateForCurrency, convertBaseToCurrency, rates }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
