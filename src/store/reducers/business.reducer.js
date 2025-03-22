import * as actionTypes from '../actions/action.types';

const initialState = {
    profiles: [],
    fetchingProfiles: false,
    page: 0,
    adding: false,
    sortType: "NEWEST",
    more: false,
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: [],
    searchKey: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_BUSINESS_PROFILES:
            return {
                ...state,
                fetchingProfiles: true
            };
        case actionTypes.END_FETCHING_BUSINESS_PROFILES:
            return {
                ...state,
                fetchingProfiles: false
            };
        case actionTypes.FETCH_BUSINESS_PROFILES:
            return {
                ...state,
                profiles: [...state.profiles, ...action.profiles],
                page: state.page + 1,
                more: action.profiles.length >= 10
            };
        case actionTypes.START_ADDING_BUSINESS_PROFILE:
            return {
                ...state,
                adding: true
            };
        case actionTypes.END_ADDING_BUSINESS_PROFILE:
            return {
                ...state,
                adding: false
            };
        case actionTypes.ADD_BUSINESS_PROFILE:
            return {
                ...state,
                profiles: [action.profile, ...state.profiles]
            };
        case actionTypes.EDIT_BUSINESS_PROFILE:
            if (state.sortType === 'NEWEST') {
                const profilesCopy = state.profiles.filter(p => p.id !== action.profile.id);
                return {
                    ...state,
                    profiles: [action.profile, ...profilesCopy]
                };
            } else {
                const profileIndex = state.profiles.findIndex(p => p.id === action.profile.id);
                if (profileIndex !== -1) {
                    const profilesCopy = [...state.profiles];
                    profilesCopy[profileIndex] = action.profile;
                    return {
                        ...state,
                        profiles: profilesCopy
                    };
                }
            }
            return state;
        case actionTypes.START_DELETING_BUSINESS_PROFILE:
            return {
                ...state,
                deleting: true
            };
        case actionTypes.END_DELETING_BUSINESS_PROFILE:
            return {
                ...state,
                deleting: false
            };
        case actionTypes.DELETE_BUSINESS_PROFILE:
            const stateCopy = state.profiles.filter(c => c.id !== action.businessId);
            const searchResultsCopy = state.searchResults.filter(r => r.id !== action.businessId);
            return {
                ...state,
                profiles: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            };
        case actionTypes.CHANGE_SORT_BUSINESS_PROFILES:
            return {
                ...state,
                profiles: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            };
        case actionTypes.START_SEARCHING_BUSINESS_PROFILES:
            return {
                ...state,
                searching: true
            };
        case actionTypes.END_SEARCHING_BUSINESS_PROFILES:
            return {
                ...state,
                searching: false
            };
        case actionTypes.SEARCH_BUSINESS_PROFILES:
            return {
                ...state,
                searchResults: action.page === 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            };
        case actionTypes.OPEN_SEARCH_BUSINESS_PROFILES:
            return {
                ...state,
                search: true
            };
        case actionTypes.CLOSE_SEARCH_BUSINESS_PROFILES:
            return {
                ...state,
                search: false
            };
        default:
            return state;
    }
};
