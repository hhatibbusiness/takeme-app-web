import React, { createContext, useEffect, useReducer } from 'react'
import { BaseURL, AUTH_TOKEN } from '../assets/constants/Base'
import axios from 'axios';
import { useAlertContext } from './alerts.context';

const actionTypes = {
    START_FETCHING_COUNTRIES: 'START_FETCHING_COUNTRIES',
    END_FETCHING_COUNTRIES: "END_FETCHING_COUNTRIES",
    FETCH_COUNTRIES: "FETCH_COUNTRIES",
    START_ADDING_COUNTRY: "START_ADDING_COUNTRY",
    END_ADDING_COUNTRY: "END_ADDING_COUNTRY",
    ADD_COUNTRY: "ADD_COUNTRY",
    START_EDITING_COUNTRY: "START_EDITING_COUNTRY",
    END_EDITING_COUNTRY: "END_EDITING_COUNTRY",
    EDIT_COUNTRY: "EDIT_COUNTRY",
    START_DELETING_COUNTRY: "START_DELETING_COUNTRY",
    END_DELETING_COUNTRY: "END_DELETING_COUNTRY",
    DELETE_COUNTRY: "DELETE_COUNTRY",
    CHANGE_SORT: "CHANGE_SORT",
    START_SEARCHING_COUNTRIES: "START_SEARCHING_COUNTRIES",
    END_SEARCHING_COUNTRIES: "END_SEARCHING_COUNTRIES",
    SEARCH_COUNTRIES: "SEARCH_COUNTRIES",
    OPEN_SEARCH: 'OPEN_SEARCH',
    CLOSE_SEARCH: 'CLOSE_SEARCH',
    START_FETCHING_COUNTRY_BY_ID: "START_FETCHING_COUNTRY_BY_ID",
    END_FETCHING_COUNTRY_BY_ID: "END_FETCHING_COUNTRY_BY_ID",
    FETCH_COUNTRY_BY_ID: "FETCH_COUNTRY_BY_ID",
    START_SEARCHING_FOR_LOCALES: "START_SEARCHING_FOR_LOCALES",
    END_SEARCHING_FOR_LOCALES: "END_SEARCHING_FOR_LOCALES",
    SEARCH_FOR_LOCALES: "SEARCH_FOR_LOCALES",
    CHANGE_SELECTED_LOCALE: 'CHANGE_SELECTED_LOCALE'

}

const initialState = {
    countries: [],
    fetchingCountries: false,
    page: 0,
    sortType: "NEWEST",
    adding: false,
    editing: false,
    more: true,
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: '',
    country: {},
    fetchingCountryById: false,
    locales: [],
    searchingLocales: false,
    localesPage: 0,
    localesMore: true,
    localesSearchKey: '',
    selectedLocale: {}
}

const countriesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_COUNTRIES:
            return {
                ...state,
                fetchingCountries: true
            }
        case actionTypes.END_FETCHING_COUNTRIES:
            return {
                ...state,
                fetchingCountries: false
            }
        case actionTypes.FETCH_COUNTRIES:
            return {
                ...state,
                countries: [...state.countries, ...action.countries],
                page: state.page + 1,
                more: action.countries.length >= 10
            }
        case actionTypes.START_ADDING_COUNTRY:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_COUNTRY:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_COUNTRY:
            return {
                ...state,
                countries: [action.country, ...state.countries]
            }
        case actionTypes.START_EDITING_COUNTRY:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_COUNTRY:
            console.log('end Editing!');
            return {
                ...state,
                editing: false
            }
        case actionTypes.EDIT_COUNTRY:
            if (state.sortType == 'NEWEST') {
                const countriesCopy = state.countries.filter(c => c.id != action.country.id);
                return {
                    ...state,
                    countries: [action.country, ...countriesCopy]
                }
                
            } else {
                const countryIndex = state.countries.findIndex(c => c.id == action.country.id);
                state.countries[countryIndex] = action.country;
                return {
                    ...state,
                    countries: [...JSON.parse(JSON.stringify(state.countries))]
                }

            }
        case actionTypes.START_DELETING_COUNTRY:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_COUNTRY:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_COUNTRY:
            const stateCopy = state.countries.filter(c => c.id != action.countryId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.countryId);
            return {
                ...state,
                countries: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT:
            return {
                ...state,
                countries: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            }
        case actionTypes.START_SEARCHING_COUNTRIES:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_COUNTRIES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_COUNTRIES:
            return {
                ...state,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.OPEN_SEARCH:
            return {
                ...state,
                search: true
            }
        case actionTypes.CLOSE_SEARCH:
            return {
                ...state,
                search: false
            }
        case actionTypes.START_FETCHING_LOCALE_BY_ID:
            return {
                ...state,
                fetchingCountryById: true
            }
        case actionTypes.END_FETCHING_LOCALE_BY_ID:
            return {
                ...state,
                fetchingCountryById: false
            }
        case actionTypes.FETCH_LOCALE_BY_ID:
            return {
                ...state,
                country: action.country
            }
        case actionTypes.START_SEARCHING_FOR_LOCALES:
            return {
                ...state,
                searchingLocales: true
            }
        case actionTypes.END_SEARCHING_FOR_LOCALES:
            return {
                ...state,
                searchingLocales: false
            }
        case actionTypes.SEARCH_FOR_LOCALES:
            return {
                ...state,
                locales: [...state.locales, ...action.locales],
                localesPage: state.localesPage + 1,
                localesMore: action.locales.length >= 10,
                localesSearchKey: action.searchKey
            }
        case actionTypes.CHANGE_SELECTED_LOCALE:
            return {
                ...state,
                selectedLocale: action.locale
            }
        default:
            return state;
    }
}

const countriesActions = {
    changeSortType: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.CHANGE_SORT, sortType: data.sortType });
            const fetchingData = {
                lan: 'ar',
                page: 0,
                sortType: data.sortType,
                searchKey: data.searchKey || ''
            };
            countriesActions.fetchCountries(dispatch, fetchingData);
            countriesActions.searchCountries(dispatch, fetchingData);
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    fetchCountries: async (dispatch, data=null, addAlert) => {
        try {
            if(data.page == 0) dispatch({ type: actionTypes.START_FETCHING_COUNTRIES });
            const res = await axios.get(`${BaseURL}/countries/list?mLocale=${data.lan}&page=${data.page}&ascending=${true}`);
            dispatch({type: actionTypes.FETCH_COUNTRIES, countries: res.data.output})
            dispatch({ type: actionTypes.END_FETCHING_COUNTRIES });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    addCountry: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_ADDING_COUNTRY });
            const res = await axios.post(`${BaseURL}/countries/add?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
            dispatch({type: actionTypes.ADD_COUNTRY, country: res.data.output})
            dispatch({ type: actionTypes.END_ADDING_COUNTRY });
            return res;
        } catch (e) {
            console.error(e);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_ADDING_COUNTRY });
        }
    },
    editCountry: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_EDITING_COUNTRY });
            const res = await axios.put(`${BaseURL}/countries/update?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
            dispatch({ type: actionTypes.EDIT_COUNTRY, country: res.data.output });
            dispatch({ type: actionTypes.END_EDITING_COUNTRY });
            return res;
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_EDITING_COUNTRY });
        }
    },
    deleteCountry: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_DELETING_COUNTRY });
            const res = await axios.delete(`${BaseURL}/countries/delete?Mlocale=${data.lan}&countryId=${data.countryId}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });

            dispatch({
                type: actionTypes.DELETE_COUNTRY,
                countryId: data.countryId
            })
            dispatch({ type: actionTypes.END_DELETING_COUNTRY });
        } catch (e) {
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_DELETING_COUNTRY });
        }
    },
    searchCountries: async (dispatch, data, addAlert) => {
        try {
            if(data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_COUNTRIES });
            const res = await axios.get(`${BaseURL}/countries/search?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json'} });
            dispatch({ type: actionTypes.SEARCH_COUNTRIES, searchResults: res.data.output, searchKey: data.searchKey, page: data.page });
            
            dispatch({ type: actionTypes.END_SEARCHING_COUNTRIES });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    openSearch: (dispatch) => {
        dispatch({type: actionTypes.OPEN_SEARCH})
    },
    closeSearch: (dispatch) => {
        dispatch({type: actionTypes.CLOSE_SEARCH})
    },
    fetchCountryById: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_FETCHING_LOCALE_BY_ID });
            const res = await axios.get(`${BaseURL}/countries/get?mLocale=${data.lan}&countryId=${data.countryId}`);
            dispatch({ type: actionTypes.FETCH_LOCALE_BY_ID, country: res.data.output });
            // dispatch({type: actionTypes.FETCH_COUNTRY_BY_ID, country: res.data.output})
            dispatch({ type: actionTypes.END_FETCHING_LOCALE_BY_ID });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    searchForLocales: async (dispatch, data, addAlert) => {
        try {
            if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_FOR_LOCALES });
            const res = await axios.get(`${BaseURL}/locales/search?mLocale=${data.locale}&searchKey=${data.searchKey}&page=${data.page}&sortType=NEWEST`);
            dispatch({ type: actionTypes.SEARCH_FOR_LOCALES, locales: res.data.output });
            dispatch({ type: actionTypes.END_SEARCHING_FOR_LOCALES });
        } catch (e) {
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    changeSelectedLocale: (dispatch, locale) => {
        dispatch({type: actionTypes.CHANGE_SELECTED_LOCALE, locale})
    }

}


const CountriesContext = createContext();

export const CountriesProvider = ({ children }) => {
    const { alerts, addAlert } = useAlertContext();
    const [countries, dispatch] = useReducer(countriesReducer, initialState);
    
    useEffect(() => {
        const data = {
            lan: 'ar',
            page: 0,
            sortType: 'NEWEST',
        };

        countriesActions.fetchCountries( dispatch, data, addAlert);
    }, [dispatch]);

    useEffect(() => {
        const data = {
            lan: 'ar',
            localeId: 53,
            countryName: 'Egypt',
            timeZone: 'GMT+3',
            countryCode: 'eg',
            comments: 'notes',
        };

        // countriesActions.addCountry(dispatch, data, addAlert);
    }, [dispatch]);

    return (
        <CountriesContext.Provider
            value={{
                countries,
                fetchCountries: data => countriesActions.fetchCountries(dispatch, data, addAlert),
                addCountry: data => countriesActions.addCountry(dispatch, data, addAlert),
                editCountry: data => countriesActions.editCountry(dispatch, data, addAlert),
                deleteCountry: data => countriesActions.deleteCountry(dispatch, data, addAlert),
                searchCountries: data => countriesActions.searchCountries(dispatch, data, addAlert),
                openSearchCountries: () => countriesActions.openSearch(dispatch),
                closeSearchCountries: () => countriesActions.closeSearch(dispatch),
                fetchCountryById: data => countriesActions.fetchCountryById(dispatch, data, addAlert),
                searchLocales: data => countriesActions.searchForLocales(dispatch, data, addAlert),
                changeSelectedLocale: locale => countriesActions.changeSelectedLocale(dispatch, locale)
            }}
        >
            {
                children
            }
        </CountriesContext.Provider>
    )
}

export const useCountriesContext = () => React.useContext(CountriesContext);