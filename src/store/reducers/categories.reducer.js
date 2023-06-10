import * as actionTypes from '../actions/action.types';

const initialState = {
    categories: []
};

export default (state = initialState, action) => {
    switch (action.type) {
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