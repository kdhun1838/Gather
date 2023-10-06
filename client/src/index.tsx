import "./index.css";
import { composeWithDevTools } from "@redux-devtools/extension";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { legacy_createStore, applyMiddleware } from "redux";
import App from "./App";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "@redux-saga/core";

const sagaMiddleWare = createSagaMiddleware();
const store = legacy_createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleWare))
);

sagaMiddleWare.run(rootSaga);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
