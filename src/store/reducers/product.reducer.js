import * as actionTypes from '../actions/action.types';

const initialState = {
    product: {},
    providers: [],
    page: 0,
    loadingProducts: false,
    openGallery: false,
    galleryProduct: {},
    more: false,
    currentProductTypeId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PRODUCT_TYPE_PROVIDERS:
            return (() => {

                return {
                    ...state,
                    providers:  [...state.providers, ...action.providers],
                    more: action.providers.length >= 10
                }
            })();
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
        case actionTypes.CHANGE_CURRENT_PRODUCT_TYPE_ID:
            return {
                ...state,
                currentProductTypeId: action.id,
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
        case actionTypes.EDIT_PROVIDER_PRODUCT:
            if(state.providers?.length == 0) return state;
            return (() => {
                const provider = {
                    ...state.providers?.filter(p => p.providerId == action.product?.providerId)[0]
                };

                console.log(provider?.products, action.product?.productTypeId);

                const editedProductIndex = provider?.products[action?.product?.productTypeId]?.findIndex(p => p.id == action.product.id);
                console.log(editedProductIndex);
                if(editedProductIndex == undefined) return state;
                provider.products[action?.product?.productTypeId][editedProductIndex] = action.product;
                console.log(provider);

                const providerIndex = state?.providers?.findIndex(p => p.id == action.product.id);
                state.providers[providerIndex] = provider;
                return {
                    ...state,
                    providers: JSON.parse(JSON.stringify(state.providers))
                };
            })();

        default:
            return state;
    }
}