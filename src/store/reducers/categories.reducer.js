import * as actionTypes from '../actions/action.types';

const initialState = {
    categories: [],
    loadingCategories: true,
    curId: null,
    loadingCategoryProducts: true,
    products: [],
    value: 100
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
        case actionTypes.CHANGE_CURRENT_ID:
            return (() => ({
                ...state,
                curId: action.id
            }))();
        case actionTypes.START_FETCHING_PRODUCTS:
            return {
                ...state,
                loadingCategoryProducts: true
            }
        case actionTypes.END_FETCHING_PRODUCTS:
            return {
                ...state,
                loadingCategoryProducts: false
            }
        case actionTypes.FETCH_CATEGORY_PRODUCTS:
            return (() => ({
                ...state,
                products: action.products
            }))();
        case actionTypes.CHANGE_SLIDER_VALUE:
            return {
                ...state,
                value: action.value
            }
        default:
            return state;
    }
}