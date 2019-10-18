import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouting from "./routing/AppRouting";
//import * as serviceWorker from "./serviceWorker";
import stores from "./store";
import { Provider } from "mobx-react";
ReactDOM.render(
  <Provider {...stores}>
    <AppRouting />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
