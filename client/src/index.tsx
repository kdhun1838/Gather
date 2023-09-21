import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux"; // createStore 함수를 사용하도록 수정
import App from "./App";
import rootReducer, { rootSaga } from "./modules";
import createSagaMiddleware from "@redux-saga/core";
import { composeWithDevTools } from "redux-devtools-extension"; // composeWithDevTools를 import

const sagaMiddleware = createSagaMiddleware();

// createStore 함수에 composeWithDevTools를 사용하여 Redux DevTools 확장 프로그램을 적용
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

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

sagaMiddleware.run(rootSaga);
