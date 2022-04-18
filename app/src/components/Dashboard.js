import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FormattedMessage id="hello" />
        </h1>
        <p>
          <Link to="/">Go home</Link>
        </p>
      </header>
    </div>
  );
};

export default Dashboard;
