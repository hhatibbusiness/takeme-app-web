import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer from './store/reducers/index.reducer';
import configureReducer from './store/index.store';
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import history from "./utls/history/history.utl";
import {AliveScope} from "react-activation";

import './i18n';

const store = configureReducer(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <HashRouter history={history}>
            <AliveScope>
                <App />
            </AliveScope>
        </HashRouter>
    </Provider>
);
