import * as actionTypes from '../actions/action.types';

const initialState = {
    categories: [],
    loadingCategories: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_CATEGORIES:
            return {
                ...state,
                loadingCategories: true
            }
        case actionTypes.END_FETCHING_CATEGORIES:
            return {
                ...state,
                loadingCategories: false
            }
        case actionTypes.FETCH_CATEGORIES_SUCCESS:
            return (() => {
                return {
                    ...state,
                    categories: action.categories
                }
            })();
        default:
            return state;
    }
}