import './index.css';
import { composeWithDevTools } from '@redux-devtools/extension';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore, applyMiddleware } from 'redux';
import App from './App';
import rootReducer, { rootSaga } from './modules';
import createSagaMiddleware from '@redux-saga/core';
import { tempSetUser, check } from './modules/user/action';

const sagaMiddleWare = createSagaMiddleware();
// const store = legacy_createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleWare))
// );
const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleWare));
// const { user } = useSelector((state: RootState) => ({
//   user: state.user.user,
// }));

function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return;
    store.dispatch(tempSetUser(JSON.parse(user)));
    // store.dispatch(check(user));
    // await client.post("/auth/countVisitor");
  } catch (e) {
    console.log('localStorage is not working');
  }
}

sagaMiddleWare.run(rootSaga);
loadUser();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
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
