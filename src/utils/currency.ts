import Currencies from "../../assets/currencyList.json";

export function getCurrencyList() {
  return Currencies;
}

// {
//     "fromCurrency": {
//       "code": "AED",
//       "currencyName": "United Arab Emirates Dirham",
//       "symbol": "AED",
//       "localSymbol": "AED",
//       "precision": 2,
//       "currency": "AED"
//     },
//     "toCurrency": {
//       "code": "USD",
//       "currencyName": "United States Dollar",
//       "symbol": "US$",
//       "localSymbol": "$",
//       "precision": 2,
//       "currency": "USD"
//     },
//     "conversionRate": 0.27225701
//   }

export async function convertINRToNativeCurrency(
  amountInINR,
  nativeCurrency: string
) {
  const URL = `https://www.headout.com/api/v1/currency/convert?from-currency=INR&to-currency=${nativeCurrency}`;

  const response = await fetch(URL);
  const data = await response.json();

  const convertedAmountInINR = (
    amountInINR * data.toCurrency.conversionRate
  ).toPrecision(2);

  return convertedAmountInINR;
}
