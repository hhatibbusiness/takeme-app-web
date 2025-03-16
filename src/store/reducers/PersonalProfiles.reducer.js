import * as actionTypes from '../actions/action.types';

const initialState = {
    profiles: [],
    fetching: false,
    page: 0,
    more: false,
    sortType: 'NEWEST',
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
        default:
            return state;
    }
}