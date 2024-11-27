import React, { createContext, useEffect, useReducer } from "react";
import { useAlertContext } from "./alerts.context";
import axios from 'axios';
import { AUTH_TOKEN, BaseURL } from "../assets/constants/Base";
import { useSelectContext } from "./single.select.context";

const actionTypes = {
    START_FETCHING_LOCALES: 'START_FETCHING_LOCALES',
    END_FETCHING_LOCALES: "END_FETCHING_LOCALES",
    FETCH_LOCALES: "FETCH_LOCALES",
    START_ADDING_LOCALE: "START_ADDING_LOCALE",
    END_ADDING_LOCALE: "END_ADDING_LOCALE",
    ADD_LOCALE: "ADD_LOCALE",
    START_EDITING_LOCALE: 'START_EDITING_LOCALE',
    END_EDITING_LOCALE: "END_EDITING_LOCALE",
    EDIT_LOCALE: "EDIT_LOCALE",
    START_SEARCHING_LOCALES: "START_SEARCHING_LOCALES",
    END_SEARCHING_LOCALES: "END_SEARCHING_LOCALES",
    SEARCH_LOCALES: "SEARCH_LOCALES",
    START_DELETING_LOCALE: "START_DELETING_LOCALE",
    END_DELETING_LOCALE: "END_DELETING_LOCALE",
    DELETE_LOCALE: "DELETE_LOCALE",
    CHANGE_SORT: "CHANGE_SORT",
    OPEN_SEARCH: "OPEN_SEARCH",
    CLOSE_SEARCH: "CLOSE_SEARCH",
    START_FETCHING_LOCALE_BY_ID: "START_FETCHING_LOCALE_BY_ID",
    END_FETCHING_LOCALE_BY_ID: "END_FETCHING_LOCALE_BY_ID",
    FETCH_LOCALE_BY_ID: "FETCH_LOCALE_BY_ID",
    CHANGE_SELECTED_LANGUAGE: 'CHANGE_SELECTED_LANGUAGE',
    START_FETCHING_LANGUAGES: "START_FETCHING_LANGUAGES",
    END_FETCHING_LANGUAGES: "END_FETCHING_LANGUAGES",
    FETCH_LANGAUGES: "FETCH_LANGAUGES",
    START_SEARCHING_LANGUAGES: "START_SEARCHING_LANGUAGES",
    END_SEARCHING_LANGUAGES: "END_SEARCHING_LANGUAGES",
    SEARCH_LANGUAGES: "SEARCH_LANGUAGES",
}

const initialState = {
    locales: [
        
    ],
    fetchingLocales: false,
    more: true,
    page: 0,
    adding: false,
    editing: false,
    sortType: 'NEWEST',
    searching: false,
    search: false,
    searchResults: [],
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: '',
    deleting: false,
    fetchingLocaleById: false,
    locale: {},
    selectedLanguage: {},
    languages: [],
    fetchingLanguages: true,
    moreLanguages: false,
    languagesPage: 0,
    languagesSearchKey: ''
};

const localesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_LOCALES:
            return {
                ...state,
                fetchingLocales: true
            }
        case actionTypes.END_FETCHING_LOCALES:
            return {
                ...state,
                fetchingLocales: false
            }
        case actionTypes.FETCH_LOCALES:
            return {
                ...state,
                locales: [...state.locales, ...action.locales],
                page: state.page + 1,
                more: action.locales.length >= 10
            }
        case actionTypes.START_ADDING_LOCALE:
            return {
                ...state,
                adding: true

            }
        case actionTypes.END_ADDING_LOCALE:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_LOCALE:
            return {
                ...state,
                locales: [action.locale, ...state.locales]
            }
        case actionTypes.START_EDITING_LOCALE:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_LOCALE:
            return {
                ...state,
                editing: false
            }
        case actionTypes.EDIT_LOCALE:
            if (state.sortType == 'NEWEST') {
                const localesCopy = state.locales.filter(l => l.id != action.locale.id);
                return {
                    ...state,
                    locales: [action.locale, ...localesCopy]
                }
                
            } else {
                const localeIndex = state.locales.findIndex(l => l.id == action.locale.id);
                state.locales[localeIndex] = action.locale;
                return {
                    ...state,
                    locales: [...JSON.parse(JSON.stringify(state.locales))]
                }
            }
        case actionTypes.START_SEARCHING_LOCALES:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_LOCALES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_LOCALES:
            return {
                ...state,
                moreSearchResults: action.searchResults.length >= 10,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.START_DELETING_LOCALE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_LOCALE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_LOCALE:
            const stateCopy = state.locales.filter(l => l.id != action.localeId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.localeId);
            return {
                ...state,
                locales: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT:
            return {
                ...state,
                locales: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0 
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
                fetchingLocaleById: true
            }
        case actionTypes.END_FETCHING_LOCALE_BY_ID:
            return {
                ...state,
                fetchingLocaleById: false
            }
        case actionTypes.FETCH_LOCALE_BY_ID:
            return {
                ...state,
                locale: action.locale
            }
        case actionTypes.CHANGE_SELECTED_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.language
            }
        case actionTypes.SEARCH_LANGUAGES:
            console.log(action, action.languages);
            return {
                ...state,
                languages: action.page == 0 ? [...action.languages] : [...state.languages, ...action.languages],
                moreLanguages: action.languages.length >= 10,
                languagesPage: state.languagesPage + 1,
                languagesSearchKey: action.searchKey
            }
        case actionTypes.START_SEARCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: true
            }
        case actionTypes.END_SEARCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: false
            }
        default:
            return state;
    }
}

const localesActions = {
    fetchLocales: async (dispatch, data=null, addAlert) => {
        try {
            if(data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LOCALES });
            const res = await axios.get(`${BaseURL}/locales/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
            dispatch({type: actionTypes.FETCH_LOCALES, locales: res.data.output})
            dispatch({ type: actionTypes.END_FETCHING_LOCALES });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    addLocale: async (dispatch, data, addAlert) => {
        try {
            const postData = {
                name: data.name,
                englishName: data.englishName,
                languageId: data.languageId,
                locale: data.locale,
                code: data.code,
                comments: data.comments
    
            }
            dispatch({ type: actionTypes.START_ADDING_LOCALE });
            const res = await axios.post(`${BaseURL}/locales/add?mLocale=${data.lan}`, postData, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({type: actionTypes.ADD_LOCALE, locale: res.data.output})
            dispatch({ type: actionTypes.END_ADDING_LOCALE });
            return res;
        } catch (e) {
            console.error(e);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_ADDING_LOCALE });
        }
    },
    editLocale: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_EDITING_LOCALE });
            const res = await axios.put(`${BaseURL}/locales/update?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({ type: actionTypes.EDIT_LOCALE, locale: res.data.output });
            dispatch({ type: actionTypes.END_EDITING_LOCALE });
            console.log('reached this part');
            return res;
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_EDITING_LOCALE });
        }
    },
    deleteLocale: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_DELETING_LOCALE });
            const res = await axios.delete(`${BaseURL}/locales/delete?Mlocale=${data.lan}&localeId=${data.localeId}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });

            dispatch({type: actionTypes.DELETE_LOCALE, localeId: data.localeId})
            dispatch({ type: actionTypes.END_DELETING_LOCALE });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_DELETING_LOCALE });
        }
    },
    changeSortType: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.CHANGE_SORT, sortType: data.sortType });
            console.log('this is working!')
            const fetchingData = {
                lan: 'ar',
                page: 0,
                sortType: data.sortType,
                searchKey: data.searchKey || ''
            };
            localesActions.fetchLocales(dispatch, fetchingData, addAlert);
            localesActions.searchLocales(dispatch, fetchingData, addAlert);
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    searchLocales: async (dispatch, data, addAlert) => {
        try {
            console.log(data);
            if(data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_LOCALES });
            const res = await axios.get(`${BaseURL}/locales/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({ type: actionTypes.SEARCH_LOCALES, searchResults: res.data.output, searchKey: data.searchKey, page: data.page });
            
            dispatch({ type: actionTypes.END_SEARCHING_LOCALES });
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
    fetchLocaleById: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_FETCHING_LOCALE_BY_ID });
            const res = await axios.get(`${BaseURL}/locales/get?mLocale=${data.lan}&localeId=${data.localeId}`);
            dispatch({ type: actionTypes.FETCH_LOCALE_BY_ID, locale: res.data.output });
            dispatch({type: actionTypes.CHANGE_SELECTED_LANGUAGE, language: res.data.output.languageEntity})
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
    fetchLangauges: async (dispatch, data, addAlert) => {
        try {
            if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LANGUAGES });
            const res = await axios.get(`${BaseURL}/languages/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
            console.log(res);
            dispatch({ type: actionTypes.FETCH_LANGAUGES, languages: res.data.output });
            dispatch({ type: actionTypes.END_FETCHING_LANGUAGES });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);

        }
    },
    searchLanguages: async (dispatch, data, addAlert, props, changeProps) => {
        try {
            console.log(data);
            if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LANGUAGES });
            const res = await axios.get(`${BaseURL}/languages/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`);
            console.log(res.data.output);
            dispatch({ type: actionTypes.SEARCH_LANGUAGES, languages: res.data.output, searchKey: data.searchKey, page: data.page });
            dispatch({ type: actionTypes.END_SEARCHING_LANGUAGES });
            return res;
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);

        }
    },
    changeSelectedLanguage: (dispatch, language) => {
        dispatch({type: actionTypes.CHANGE_SELECTED_LANGUAGE, language})
    }
    
}


const localesContext = createContext();

export const LocalesProvider = ({ children }) => {
    const { addAlert } = useAlertContext();
    const { select, changeProps } = useSelectContext();
    const [locales, dispatch] = useReducer(localesReducer, initialState);
    
    useEffect(() => {
        const data = {
            lan: 'ar',
            sortType: 'NEWEST',
            page: 0
        }
        localesActions.fetchLocales(dispatch, data, addAlert);
    }, [dispatch]);

    // useEffect(() => { 
    //     const data = {
    //         lan: 'adsf',
    //         name: 'adsfaf',
    //         englishName: "adsf",
    //         languageId: 90,
    //         locale: 'fdasf',
    //         code: 'fdasf',
    //         comments: 'notes'
    //     }

    //     localesActions.addLocale(dispatch, data, addAlert);
    //  }, [dispatch])

    return (
        <localesContext.Provider
            value={{
                locales,
                changeLocalesSort: data => localesActions.changeSortType(dispatch, data, addAlert), 
                fetchLocales: (data) => localesActions.fetchLocales(dispatch, data, addAlert),
                openLocalesSearch: () => localesActions.openSearch(dispatch),
                closeLocalesSearch: () => localesActions.closeSearch(dispatch),
                searchLocales: data => localesActions.searchLocales(dispatch, data, addAlert),
                addLocale: data => localesActions.addLocale(dispatch, data, addAlert),
                deleteLocale: data => localesActions.deleteLocale(dispatch, data, addAlert),
                editLocale: data => localesActions.editLocale(dispatch, data, addAlert),
                fetchLocaleById: data => localesActions.fetchLocaleById(dispatch, data, addAlert),
                searchLanguages: data => localesActions.searchLanguages(dispatch, data, addAlert, select.props, changeProps),
                changeSelectedLanguage: language => localesActions.changeSelectedLanguage(dispatch, language)
            }}
        >
            {
                children
            }
        </localesContext.Provider>
    )
}

export const useLocalesContext = () => React.useContext(localesContext);