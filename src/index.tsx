import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import Store from './Global/Redux/Store';
import { Router } from 'react-router-dom';
import history from './Global/Components/history'
import { PersistGate } from 'redux-persist/integration/react';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(

  //Wrapping the App in a Provider so it has access to the Redux's store
  <Provider store={Store.store}>
    <PersistGate loading={true} persistor={Store.persistor}>
      <Router history={history}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')

  // < React.StrictMode >
  // <App />
  // </React.StrictMode >,
  // document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
