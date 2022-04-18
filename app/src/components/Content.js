import React from "react";
import { LOCALES } from "../localization/locales";
import { FormattedMessage } from "react-intl";

const Content = (props) => {
  const languages = [
    { name: "English", code: LOCALES.ENGLISH },
    { name: "Norsk", code: LOCALES.NORWEGIAN },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FormattedMessage id="hello" />
        </h1>
        <p>
          <FormattedMessage id="sub_header" />
        </p>

        <div className="switcher">
          Languages{" "}
          <select onChange={props.handleChange} value={props.currentLocale}>
            {languages.map(({ name, code }) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <p>
          <FormattedMessage id="price_display" values={{ n: 59.99 }} />
        </p>
        <p>
          <FormattedMessage id="number_display" values={{ n: 2000 }} />
        </p>
        <p>
          <FormattedMessage id="start_today" values={{ d: new Date() }} />
        </p>
      </header>
    </div>
  );
};

export default Content;
