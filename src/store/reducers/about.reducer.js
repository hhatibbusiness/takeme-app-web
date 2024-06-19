import * as actionTypes from '../actions/action.types';

const initialState = {
    data: '',
    fetchingAboutPage: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_ABOUT_PAGE:
            return {
                ...state,
                fetchingAboutPage: true
            }
            case actionTypes.END_FETCHING_ABOUT_PAGE:
                return {
                    ...state,
                    fetchingAboutPage: false
                }
        case actionTypes.FETCH_ABOUT_PAGE:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}