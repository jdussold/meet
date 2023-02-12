import React from "react";
//import ReactDOM from "react-dom/client";
import { render } from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import * as atatus from "atatus-spa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

atatus.config("2221ec882cd74948b247fe5ac02a3b9e").install();

const root = document.getElementById("root");
//const root = ReactDOM.createRoot(document.getElementById("root"));
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);

serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
