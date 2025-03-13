import * as actionTypes from '../actions/action.types';

const initialState = {
    roles: [],
    fetchingRoles: false,
    page: 0,
    more: true,
    sortType: 'NEWEST',
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: '',
    adding: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_ROLES:
            return {
                ...state,
                fetchingRoles: true
            }
        case actionTypes.END_FETCHING_ROLES:
            return {
                ...state,
                fetchingRoles: false
            }
        case actionTypes.FETCH_ROLES:
            return {
                ...state,
                roles: action.roles,
                more: action.roles.length >= 10
            }
        case actionTypes.CHANGE_SORT_ROLES:
            return {
                ...state,
                sortType: action.sortType,
            }
        case actionTypes.START_DELETING_ROLE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_ROLE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_ROLE:
            const remainingRoles = state.roles.filter(r => r.id != action.roleId);
            return {
                ...state,
                roles: [...remainingRoles]
            }
        case actionTypes.START_ADDING_ROLE:
            return {
                ...state,
                adding: true,
            }
        case actionTypes.END_ADDING_ROLE:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_ROLE:
            return {
                ...state,
                roles: [action.role, ...state.roles]
            }
        default:
            return state;
    }
}