import * as actionTypes from '../actions/action.types';

const initialState = {
    product: {},
    providers: [],
    page: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_TYPE_PROVIDERS:
            return {
                ...state,
                providers: [...state.providers, ...action.providers]
            }
        case actionTypes.FETCH_PRODUCT_TYPE_DETAILS:
            return {
                ...state,
                product: action.product
            }
        default:
            return state;
    }
}