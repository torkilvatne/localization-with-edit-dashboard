import { useState } from "react";
import { IntlProvider } from "react-intl";
import "./App.css";

import Content from "./components/Content";
import { LOCALES } from "./localization/locales";
import { messages } from "./localization/messages";

function App() {
  function getInitialLocal() {
    // getting stored items
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.ENGLISH;
  }

  const [currentLocale, setCurrentLocale] = useState(getInitialLocal());

  const handleChange = (e) => {
    setCurrentLocale(e.target.value);
    // storing locale in the localstorage
    localStorage.setItem("locale", e.target.value);
  };

  return (
    <IntlProvider
      messages={messages[currentLocale]}
      locale={currentLocale}
      defaultLocale={LOCALES.ENGLISH}
    >
      <Content currentLocale={currentLocale} handleChange={handleChange} />
    </IntlProvider>
  );
}

export default App;
