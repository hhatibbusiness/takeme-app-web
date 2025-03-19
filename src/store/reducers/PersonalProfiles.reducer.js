import * as actionTypes from '../actions/action.types';

const initialState = {
    profiles: [],
    fetching: false,
    page: 0,
    more: false,
    sortType: 'NEWEST',
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: '',
    deleting: false,

}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_PERSONAL_PROFILES:
            return {
                ...state,
                fetching: true,
            }
        case actionTypes.END_FETCHING_PERSONAL_PROFILES:
            return {
                ...state,
                fetching: false
            }
        case actionTypes.FETCH_PERSONAL_PROFILES:
            return {
                ...state,
                profiles: action.profiles,
                more: action.profiles.length >= 10,
                page: state.page + 1
            }
        case actionTypes.START_SEARCHING_PROFILES:
            return  {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_PROFILES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_PROFILES:
            return {
                ...state,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.OPEN_SEARCH_PROFILES:
            return {
                ...state,
                search: true
            }
        case actionTypes.CLOSE_SEARCH_PROFILES:
            return {
                ...state,
                search: false
            }
        case actionTypes.START_DELETING_PERSONAL_PROFILE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_PERSONAL_PROFILE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_PERSONAL_PROFILE:
            const stateCopy = state.profiles.filter(p => p.id != action.userId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.userId);

            return {
                ...state,
                profiles: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_PERSONAL_SORTTYPE:
            return {
                ...state,
                sortType: action.sortType,
                profiles: [],
                searchResults: [],
                more: true,
                page: 0,
                moreSearchResults: true,
                searchResultsPage: 0
            }
        default:
            return state;
    }
}