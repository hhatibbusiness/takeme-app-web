import * as actionTypes from '../actions/action.types';

const initialState = {
    ratings: [],
    fetchingRatings: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_PROVIDER_RATINGS:
            return {
                ...state,
                fetchingRatings: true
            }
        case actionTypes.END_FETCHING_PROVIDER_RATINGS:
            return {
                ...state,
                fetchingRatings: false
            }
        case actionTypes.FETCH_PROVIDER_RATINGS:
            return {
                ...state,
                ratings: action.ratings
            }
        default:
            return state
    }
}