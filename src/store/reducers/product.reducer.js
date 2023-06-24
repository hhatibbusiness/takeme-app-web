import * as actionTypes from '../actions/action.types';

const initialState = {
    product: {},
    providers: [],
    page: 0,
    loadingProducts: true,
    openGallery: false,
    galleryProduct: {},
    more: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_TYPE_PROVIDERS:
            return {
                ...state,
                providers:  [...state.providers, ...action.providers],
                more: action.providers.length >=10
            }
        case actionTypes.FETCH_PRODUCT_TYPE_DETAILS:
            return {
                ...state,
                product: action.product
            }
        case actionTypes.RESET_ALL_PRODUCT_DATA:
            return {
                ...state,
                product: {},
                providers: [],
                page: 0
            }
        case actionTypes.START_FETCHING_PROVIDERS_PRODUCTS:
            return {
                ...state,
                loadingProducts: true
            }
        case actionTypes.END_FETCHING_PROVIDERS_PRODUCTS:
            return {
                ...state,
                loadingProducts: false
            }
        case actionTypes.SET_GALLERY_OPEN:
            return {
                ...state,
                openGallery: true,
                galleryProduct: action.product
            }
        case actionTypes.SET_GALLERY_CLOSE:
            return {
                ...state,
                openGallery: false,
                galleryProduct: {}
            }
        case actionTypes.INCREASE_FETCHING_PROVIDERS_PRODUCTS_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case actionTypes.RESET_PROVIDERS_FETCHING_PAGE:
            return {
                ...state,
                page: 0,
                providers: []
            }
        default:
            return state;
    }
}