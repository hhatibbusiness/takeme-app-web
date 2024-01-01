import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer from './store/reducers/index.reducer';
import configureReducer from './store/index.store';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import './i18n';
import history from "./utls/history/history.utl";
import KeepAlive, {AliveScope} from "react-activation";
import smoothscroll from "smoothscroll-polyfill";

smoothscroll.polyfill();


const store = configureReducer(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <BrowserRouter history={history}>
                <AliveScope>
                    <App />
                </AliveScope>
            </BrowserRouter>

    </Provider>
);
