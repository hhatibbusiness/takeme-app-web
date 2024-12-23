import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reducer from './store/reducers/index.reducer';
import configureReducer from './store/index.store';
import {Provider} from "react-redux";
import {BrowserRouter as Router} from "react-router-dom";
import history from "./utls/history/history.utl";
import {AliveScope} from "react-activation";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { LanguagesProvider } from './context/languages.context';

import './i18n';
import AlertProvider from './context/alerts.context';
import { DetailsProvider } from './context/details.context';
import { NavbarProvider } from './context/navbar.context';
import {LocalesProvider} from "./context/locales.context";
import {SelectContextProvider} from "./context/single.select.context";
import {CountriesProvider} from "./context/countries.context";
import {PlacesProvider} from './context/placesContext';

const store = configureReducer(reducer);
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router history={history}>
            <AliveScope>
                <DetailsProvider>
                    <SelectContextProvider>
                        <AlertProvider>
                            <LocalesProvider>
                                <NavbarProvider>
                                    <LanguagesProvider>
                                        <CountriesProvider>
                                            <PlacesProvider>
                                                <App />
                                            </PlacesProvider>
                                        </CountriesProvider>
                                    </LanguagesProvider>
                                </NavbarProvider>
                            </LocalesProvider>
                        </AlertProvider>
                    </SelectContextProvider>
                </DetailsProvider>
            </AliveScope>
        </Router>
    </Provider>
);


serviceWorkerRegistration.register();
