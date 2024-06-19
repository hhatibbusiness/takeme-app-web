import * as actionTypes from '../actions/action.types';

const initialState = {
    categories: [],
    loadingCategories: true,
    curId: null,
    loadingCategoryProducts: true,
    products: [],
    value: 100,
    lan: 'ar',
    error: false,
    page: 0,
    loadingMore: false,
    more: false,
    filter: 'NONE',
    containerHeight: 'auto'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter
            }
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
                    categories: action.categories,
                    products: []
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
        case actionTypes.FETCH_PRODUCT_TYPES_FIRST:
            return {
                ...state,
                products: [...action.products],
                more: action.products.length >= 10

            }
        case actionTypes.FETCH_CATEGORY_PRODUCTS:
            return (() => ({
                ...state,
                products: [...state.products, ...action.products],
                more: action.products.length >= 10
            }))();
        case actionTypes.CHANGE_SLIDER_VALUE:
            return {
                ...state,
                value: action.value
            }
        case actionTypes.CHANGE_LAN_SUCCESS:
            return {
                ...state,
                lan: action.lan
            }
        case actionTypes.FETCH_CATEGORIES_FAILURE:
            return {
                ...state,
                categoryError: true
            }
        case actionTypes.ERROR_ACTIVE:
            return {
                ...state,
                error: true
            }
        case actionTypes.ERROR_INACTIVE:
            return {
                ...state,
                error: false
            }
        case actionTypes.INCREASE_PAGE_NUMBER:
            return {
                ...state,
                page: state.page + 1
            }
        case actionTypes.RESET_PAGE_NUMBER:
            return {
                ...state,
                page: 0,
                products: [],
            }
        default:
            return state;
    }
}