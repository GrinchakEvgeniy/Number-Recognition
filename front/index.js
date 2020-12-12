import React from 'react';
import { render } from "react-dom";
import Field from "./Field";

class App extends React.Component {

  render() {
    return (
      <div className="container">
        <Field/>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));