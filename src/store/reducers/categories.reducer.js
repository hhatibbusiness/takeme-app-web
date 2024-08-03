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
    containerHeight: 'auto',
    categoriesPage: 0,
    moreCategories: false,
    storePage: 0,
    stores: [],
    moreStores: false,
    fetchingStores: false,
    store: false
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
                    categories: [...state.categories, ...action.categories],
                    // products: []
                    moreCategories: action.categories.length >= 10

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
        case actionTypes.INCREASE_CATEGORIES_PAGE_NUMBER:
            return {
                ...state,
                categoriesPage: state.categoriesPage + 1
            }
        case actionTypes.RESET_PAGE_NUMBER:
            return {
                ...state,
                page: 0,
                products: [],
            }
        case actionTypes.RESET_CATEGORIES_PAGE:
            return {
                ...state,
                categoriesPage: 0,
                categories: []
            }
        case actionTypes.START_FETCHING_MARKET_STORES:
            return {
                ...state,
                fetchingStores: true
            }
        case actionTypes.END_FETCHING_MARKET_STORES:
            return {
                ...state,
                fetchingStores: false
            }
        case actionTypes.FETCH_MARKET_STORES:
            return {
                ...state,
                stores: [...state.stores, ...action.stores],
                storePage: state.storePage + 1,
                moreStores: action.stores.length == 10
            }
        case actionTypes.SWITCH_MARKET_STORE:
            return {
                ...state,
                store: action.value
            }
        case actionTypes.RESET_MARKET_STORE_DATA:
            return {
                ...state,
                stores: [],
                storePage: 0,
                moreStores: false
            }
        default:
            return state;
    }
}