import { useState } from "react";
import { IntlProvider } from "react-intl";
import { LOCALES } from "./localization/locales";
import messages from "./localization/messages";

import Content from "./components/Content";
import Dashboard from "./components/Dashboard";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
    <Router>
      <IntlProvider
        messages={messages[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.ENGLISH}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Content
                currentLocale={currentLocale}
                handleChange={handleChange}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </IntlProvider>
    </Router>
  );
}

export default App;
