import * as actionTypes from '../actions/action.types'

const initialState = {
    locales: [],
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

const localesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_LOCALES:
            return {
                ...state,
                fetchingLocales: true
            };
        case actionTypes.END_FETCHING_LOCALES:
            return {
                ...state,
                fetchingLocales: false
            };
        case actionTypes.FETCH_LOCALES:
            return {
                ...state,
                locales: [...state.locales, ...action.locales],
                page: state.page + 1,
                more: action.locales.length >= 10
            };
        case actionTypes.START_ADDING_LOCALE:
            return {
                ...state,
                adding: true
            };
        case actionTypes.END_ADDING_LOCALE:
            return {
                ...state,
                adding: false
            };
        case actionTypes.ADD_LOCALE:
            return {
                ...state,
                locales: [action.locale, ...state.locales]
            };
        case actionTypes.START_EDITING_LOCALE:
            return {
                ...state,
                editing: true
            };
        case actionTypes.END_EDITING_LOCALE:
            return {
                ...state,
                editing: false
            };
        case actionTypes.EDIT_LOCALE:
            if (state.sortType === 'NEWEST') {
                const localesCopy = state.locales.filter(l => l.id !== action.locale.id);
                return {
                    ...state,
                    locales: [action.locale, ...localesCopy]
                };
            } else {
                const localeIndex = state.locales.findIndex(l => l.id === action.locale.id);
                state.locales[localeIndex] = action.locale;
                return {
                    ...state,
                    locales: [...JSON.parse(JSON.stringify(state.locales))]
                };
            }
        case actionTypes.START_SEARCHING_LOCALES:
            return {
                ...state,
                searching: true
            };
        case actionTypes.END_SEARCHING_LOCALES:
            return {
                ...state,
                searching: false
            };
        case actionTypes.SEARCH_LOCALES:
            return {
                ...state,
                moreSearchResults: action.searchResults.length >= 10,
                searchResults: action.page === 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            };
        case actionTypes.START_DELETING_LOCALE:
            return {
                ...state,
                deleting: true
            };
        case actionTypes.END_DELETING_LOCALE:
            return {
                ...state,
                deleting: false
            };
        case actionTypes.DELETE_LOCALE:
            const stateCopy = state.locales.filter(l => l.id !== action.localeId);
            const searchResultsCopy = state.searchResults.filter(r => r.id !== action.localeId);
            return {
                ...state,
                locales: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            };
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
            };
        case actionTypes.OPEN_SEARCH:
            return {
                ...state,
                search: true
            };
        case actionTypes.CLOSE_SEARCH:
            return {
                ...state,
                search: false
            };
        case actionTypes.START_FETCHING_LOCALE_BY_ID:
            return {
                ...state,
                fetchingLocaleById: true
            };
        case actionTypes.END_FETCHING_LOCALE_BY_ID:
            return {
                ...state,
                fetchingLocaleById: false
            };
        case actionTypes.FETCH_LOCALE_BY_ID:
            return {
                ...state,
                locale: action.locale
            };
        case actionTypes.CHANGE_SELECTED_LANGUAGE:
            return {
                ...state,
                selectedLanguage: action.language
            };
        case actionTypes.SEARCH_LANGUAGES_LOCALES:
            return {
                ...state,
                languages: action.page === 0 ? [...action.languages] : [...state.languages, ...action.languages],
                moreLanguages: action.languages.length >= 10,
                languagesPage: state.languagesPage + 1,
                languagesSearchKey: action.searchKey
            };
        case actionTypes.START_SEARCHING_LANGUAGES_LOCALES:
            return {
                ...state,
                fetchingLanguages: true
            };
        case actionTypes.END_SEARCHING_LANGUAGES_LOCALES:
            return {
                ...state,
                fetchingLanguages: false
            };
        default:
            return state;
    }
};

export default localesReducer;
