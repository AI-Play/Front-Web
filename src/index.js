import "tw-elements";
import "./styles/index.css";
import "./styles/App.css";
import "./styles/styles.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
