import { LOCALES } from "./locales";

export const messages = {
  [LOCALES.ENGLISH]: {
    hello: "Hello, this is an example of localization",
    sub_header: "In this example we have two languages; English and Norwegian.",
    price_display:
      "How {n, number, ::currency/USD} is displayed in your selected language",
    number_display:
      "This is how {n, number} is formatted in the selected locale",
    start_today: "Todays date: {d, date}",
  },
  [LOCALES.NORWEGIAN]: {
    hello: "Hallo, dette er et eksempel på tekstlokalisering",
    sub_header: "I dette eksempelet har vi to språk; Engelsk og Norsk.",
    price_display:
      "Slik {n, number, ::currency/NOK} NOK blir valuta formattert i valgt språk",
    number_display: "Slik blir {n, number} formattert på valgt språk",
    start_today: "Dagens dato: {d, date}",
  },
};
