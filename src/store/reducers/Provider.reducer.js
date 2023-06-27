import * as actionTypes from '../actions/action.types';

const initialState = {
    provider: {},
    galleryOpen: false,
    galleryProduct: {},
    loadingProvider: true
}

export default (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_PROVIDER_DATA:
            return {
                ...state,
                provider: action.provider
            }
        case actionTypes.OPEN_PROVIDER_GALLERY:
            return {
                ...state,
                galleryOpen: true,
                galleryProduct: action.product
            }
        case actionTypes.CLOSE_PROVIDER_GALLERY:
            return {
                ...state,
                galleryOpen: false,
                galleryProduct: {}
            }
        case actionTypes.START_FETCHING_PROVIDER:
            return {
                ...state,
                loadingProvider: true
            }
        case actionTypes.END_FETCHING_PROVIDER:
            return {
                ...state,
                loadingProvider: false
            }
        default:
            return state;
    }
}