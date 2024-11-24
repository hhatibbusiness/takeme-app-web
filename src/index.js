import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer from './store/reducers/index.reducer';
import configureReducer from './store/index.store';
import {Provider} from "react-redux";
import {HashRouter, BrowserRouter as Router} from "react-router-dom";
import history from "./utls/history/history.utl";
import {AliveScope} from "react-activation";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import './i18n';

const store = configureReducer(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Router history={history}>
            <AliveScope>
                <App />
            </AliveScope>
        </Router>
    </Provider>
);


serviceWorkerRegistration.register();
