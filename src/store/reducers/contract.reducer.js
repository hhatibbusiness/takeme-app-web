import * as actionTypes from '../actions/action.types';

const initialState = {
    data: '',
    fetchingContract: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_CONTRACT_PAGE:
            return {
                ...state,
                fetchingContract: true
            }
        case actionTypes.END_FETCHING_CONTRACT_PAGE:
            return {
                ...state,
                fetchingContract: false
            }
        case actionTypes.FETCH_CONTRACT_PAGE:
            return {
                ...state,
                data: action.data
            }
        default:
            return state;
    }
}