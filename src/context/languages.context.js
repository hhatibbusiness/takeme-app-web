import React, { createContext, useEffect, useReducer } from 'react'
// import { BaseURL, AUTH_TOKEN } from '../assets/constants/Base'
import { BASE_URL } from '../utls/assets';
import axios from 'axios';
import { useAlertContext } from './alerts.context';

const AUTH_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJlNGJlMThkOC1hZGU4LTRjNTctOGFmMS0xNDExMjlkOGU5NzQiLCJzdWIiOiJhcl9TQS9mYWNlYm9vay9mdGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MzI3MzA4NjksInJvbGVzIjpbIlJPTEVfUGVyc29uIiwiUk9MRV9BZG1pbiJdLCJleHAiOjE3NDA1MDY4Njl9.ZppC0L5RwU29ZO6KHIB-B2jVlR8X1-C6Jd250-C5bdeHxSdmBfTkNCgZLHK0u3fDphngYOOylvsMCuUXnqIo4w";

const actionTypes = {
    START_FETCHING_LANGUAGES: 'START_FETCHING_LANGUAGES',
    END_FETCHING_LANGUAGES: "END_FETCHING_LANGUAGES",
    FETCH_LANGUAGES: "FETCH_LANGUAGES",
    START_ADDING_LANGUAGE: "START_ADDING_LANGUAGE",
    END_ADDING_LANGUAGE: "END_ADDING_LANGUAGE",
    ADD_LANGUAGE: "ADD_LANGUAGE",
    START_EDITING_LANGUAGE: "START_EDITING_LANGUAGE",
    END_EDITING_LANGUAGE: "END_EDITING_LANGUAGE",
    EDIT_LANGUAGE: "EDIT_LANGUAGE",
    START_DELETING_LANGUAGE: "START_DELETING_LANGUAGE",
    END_DELETING_LANGUAGE: "END_DELETING_LANGUAGE",
    DELETE_LANGUAGE: "DELETE_LANGUAGE",
    CHANGE_SORT: "CHANGE_SORT",
    START_SEARCHING_LANGUAGES: "START_SEARCHING_LANGUAGES",
    END_SEARCHING_LANGUAGES: "END_SEARCHING_LANGUAGES",
    SEARCH_LANGUAGES: "SEARCH_LANGUAGES",
    OPEN_SEARCH: 'OPEN_SEARCH',
    CLOSE_SEARCH: 'CLOSE_SEARCH'
}

const initialState = {
    languages: [],
    fetchingLanguages: false,
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
    searchKey: ''
}

const languagesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: true
            }
        case actionTypes.END_FETCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: false
            }
        case actionTypes.FETCH_LANGUAGES:
            return {
                ...state,
                languages: [...state.languages, ...action.languages],
                page: state.page + 1,
                more: action.languages.length >= 10
            }
        case actionTypes.START_ADDING_LANGUAGE:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_LANGUAGE:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_LANGUAGE:
            return {
                ...state,
                languages: [action.language, ...state.languages]
            }
        case actionTypes.START_EDITING_LANGUAGE:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_LANGUAGE:
            console.log('end Editing!');
            return {
                ...state,
                editing: false
            }
        case actionTypes.EDIT_LANGUAGE:
            if (state.sortType == 'NEWEST') {
                const languagesCopy = state.languages.filter(l => l.id != action.language.id);
                return {
                    ...state,
                    languages: [action.language, ...languagesCopy]
                }
                
            } else {
                const languageIndex = state.languages.findIndex(l => l.id == action.language.id);
                state.languages[languageIndex] = action.language;
                return {
                    ...state,
                    languages: [...JSON.parse(JSON.stringify(state.languages))]
                }

            }
        case actionTypes.START_DELETING_LANGUAGE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_LANGUAGE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_LANGUAGE:
            const stateCopy = state.languages.filter(l => l.id != action.languageId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.languageId);
            return {
                ...state,
                languages: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT:
            return {
                ...state,
                languages: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            }
        case actionTypes.START_SEARCHING_LANGUAGES:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_LANGUAGES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_LANGUAGES:
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
        default:
            return state;
    }
}

const languagesActions = {
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
            languagesActions.fetchLanguages(dispatch, fetchingData);
            languagesActions.searchLanguages(dispatch, fetchingData);
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
        }
    },
    fetchLanguages: async (dispatch, data=null, addAlert) => {
        try {
            if(data.page == 0) dispatch({ type: actionTypes.START_FETCHING_LANGUAGES });
            const res = await axios.get(`${BASE_URL}endpoints/languages/list?mLocale=${data.lan}&sortType=${data.sortType}&page=${data.page}`);
            dispatch({type: actionTypes.FETCH_LANGUAGES, languages: res.data.output})
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
    addLanguage: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_ADDING_LANGUAGE });
            const res = await axios.post(`${BASE_URL}endpoints/languages/add?mLocale=${data.lan}`, data, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({type: actionTypes.ADD_LANGUAGE, language: res.data.output})
            dispatch({ type: actionTypes.END_ADDING_LANGUAGE });
            return res;
        } catch (e) {
            console.error(e);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_ADDING_LANGUAGE });
        }
    },
    editLanguage: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_EDITING_LANGUAGE });
            const editData = {
                id: data.id,
                name: data.name,
                englishName: data.englishName,
                code: data.code,
                comments: data.comments
            };
            const res = await axios.put(`${BASE_URL}endpionts/languages/update?mLocale=${data.lan}`, editData, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({ type: actionTypes.EDIT_LANGUAGE, language: res.data.output });
            dispatch({ type: actionTypes.END_EDITING_LANGUAGE });
            console.log('reached this part');
            return res;
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_EDITING_LANGUAGE });
        }
    },
    deleteLanguage: async (dispatch, data, addAlert) => {
        try {
            dispatch({ type: actionTypes.START_DELETING_LANGUAGE });
            const res = await axios.delete(`${BASE_URL}endpoints/languages/delete?Mlocale=${data.lan}&languageId=${data.languageId}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });

            dispatch({type: actionTypes.DELETE_LANGUAGE, languageId: data.languageId})
            dispatch({ type: actionTypes.END_DELETING_LANGUAGE });
        } catch (e) {
            console.error(e.message);
            const alertData = {
                alertType: 'danger',
                msg: e.response?.data?.message || 'حدث خطأ برجاء المحاولة مرة أخري'
            };

            addAlert(alertData);
            dispatch({ type: actionTypes.END_DELETING_LANGUAGE });
        }
    },
    searchLanguages: async (dispatch, data, addAlert) => {
        try {
            if(data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_LANGUAGES });
            const res = await axios.get(`${BASE_URL}endpoints/languages/search?mLocale=${data.lan}&searchKey=${data.searchKey}&sortType=${data.sortType}&page=${data.page}`, { headers: { 'accept': '*/*', 'Content-Type': 'application/json', 'Authorization': AUTH_TOKEN } });
            dispatch({ type: actionTypes.SEARCH_LANGUAGES, searchResults: res.data.output, searchKey: data.searchKey, page: data.page });
            
            dispatch({ type: actionTypes.END_SEARCHING_LANGUAGES });
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
    }
}


const LanguagesContext = createContext();

export const LanguagesProvider = ({ children }) => {
    const { alerts, addAlert } = useAlertContext();
    const [languages, dispatch] = useReducer(languagesReducer, initialState);
    
    useEffect(() => {
        const data = {
            lan: 'ar',
            page: 0,
            sortType: 'NEWEST',
        };

        languagesActions.fetchLanguages( dispatch, data, addAlert);
    }, [dispatch]);

    useEffect(() => {
        const data = {
            lan: 'ar',
            page: 0,
            sortType: languages.sortType,
            searchKey: ''
        };
        // languagesActions.searchLanguages(dispatch, data, addAlert);
    }, [dispatch]);

    return (
        <LanguagesContext.Provider
            value={{
                languages,
                fetchLanguages: (data) => languagesActions.fetchLanguages(dispatch, data, addAlert, addAlert),
                addLanguage: data => languagesActions.addLanguage(dispatch, data, addAlert, addAlert),
                editLanguage: data => languagesActions.editLanguage(dispatch, data, addAlert, addAlert),
                deleteLanguage: data => languagesActions.deleteLanguage(dispatch, data, addAlert, addAlert),
                changeSort: data => languagesActions.changeSortType(dispatch, data, addAlert, addAlert),
                searchLanguages: data => languagesActions.searchLanguages(dispatch, data, addAlert, addAlert),
                openSearch: () => languagesActions.openSearch(dispatch),
                closeSearch: () => languagesActions.closeSearch(dispatch)
            }} >
            {children}
        </LanguagesContext.Provider>
    )
}

export const useLanguagesContext = () => React.useContext(LanguagesContext);