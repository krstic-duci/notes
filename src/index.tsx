import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "bootstrap/dist/css/bootstrap.min.css";

let persistor = persistStore(store);

ReactDOM.render(
  // Disclaimer:
  // I've added the redux-toolkit just for the brevity of this mini app
  // and showcase. Also for easier addition of persistance of data to the localStorage.
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
