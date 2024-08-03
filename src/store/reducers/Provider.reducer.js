import * as actionTypes from '../actions/action.types';

const initialState = {
    provider: {},
    galleryOpen: false,
    galleryProduct: {},
    loadingProvider: true,
    loadingProductTypes: true,
    productTypes: [],
    page: 0,
    more: false,
    curId: null,
    categories: [],
    fetchingCategories: true,
    productType: null
}

export default (state = initialState, action ) => {
    switch (action.type) {
        case actionTypes.FETCH_PROVIDER_DATA:
            const newProvidersCopy = action.provider;
                newProvidersCopy.products = {
                ...action.provider.products
            }
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
        case actionTypes.START_FETCHING_PROVIDER_PRODUCTS_TYPES:
            return {
                ...state,
                loadingProductTypes: true
            }
        case actionTypes.END_FETCHING_PROVIDER_PRODUCTS_TYPES:
            return {
                ...state,
                loadingProductTypes: false
            }
        case actionTypes.FETCH_PROVIDER_PRODUCTS_TYPES:
            const productTypes = action.productTypes.map((obj, i) => {
                return {
                    ...obj,
                    more: obj.products.length >= 10,
                    page: 1
                }
            });
            console.log(productTypes)
            return {
                ...state,
                productTypes: [...state.productTypes, ...productTypes],
                // page: state.page + 1
                more: action.productTypes.length >= 10
            }

        case actionTypes.RESET_PROVIDER_PRODUCT_TYPES_DATA:
            return {
                ...state,
                productTypes: [],
                page: 0
            }
        case actionTypes.INCREASE_PROVIDER_PRODUCT_TYPES_PAGE:
            return {
                ...state,
                page: state.page + 1
            }
        case actionTypes.START_FETCHING_PROVIDER_CATEGORIES:
            return {
                ...state,
                fetchingCategories: true
            }
        case actionTypes.END_FETCHING_PROVIDER_CATEGORIES:
            return {
                ...state,
                fetchingCategories: false
            }
        case actionTypes.FETCH_PROVIDER_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case 'FETCH_PRODUCTS_TYPES_PRODUCTS_ERROR':
            return (() => {
                // console.log(action.productType.id);
                const productTypeIndex = state.productTypes.findIndex(p => {
                    // console.log(p.id);
                    return p.id == action.productTypeId;
                });

                const productType = state.productTypes[productTypeIndex];

                if (productType !== -1 && state.productTypes[productTypeIndex]) {
                    state.productTypes[productTypeIndex].page = productType.page + 1;
                    state.productTypes[productTypeIndex].more = false;
                }

                return {
                    ...state,
                    productTypes: productTypeIndex !== -1 ? JSON.parse(JSON.stringify(state.productTypes)) : [...state.productTypes]
                }
            })();
        case actionTypes.FETCH_PRODUCTS_TYPES_PRODUCTS:
            return (() => {
                // console.log(action.productType.id);
                const productTypeIndex = state.productTypes.findIndex(p => {
                    console.log(p.id);
                    return p.id == action.productType.id;
                });

                const productType = state.productTypes[productTypeIndex];

                if (productType !== -1 && state.productTypes[productTypeIndex]) {
                    state.productTypes[productTypeIndex].products = [...productType.products, ...action.productType.products];
                    state.productTypes[productTypeIndex].page = productType.page + 1;
                    state.productTypes[productTypeIndex].more = action.productType.products.length >= 10;
                }

                return {
                    ...state,
                    productTypes: productTypeIndex !== -1 ? JSON.parse(JSON.stringify(state.productTypes)) : [...state.productTypes]
                }
            })();
        case actionTypes.CHANGE_CURRENT_PROVIDER_CATEGORY_ID:
            return {
                ...state,
                curId: action.id
            }
        case actionTypes.EDIT_PROVIDER_PRODUCT:
            return (() => {
                const productTypeCopy = {
                    ...state.productTypes?.filter(p => p.id == action.product?.productTypeId)[0]
                };
                const editedProductIndex = productTypeCopy?.products?.findIndex(p => p.id == action.product.id);
                console.log(editedProductIndex);
                console.log(productTypeCopy);
                productTypeCopy.products[editedProductIndex] = action.product;

                return {
                    ...state,
                    productTypes: [JSON.parse(JSON.stringify(productTypeCopy))]
                }
            })();
        default:
            return state;
    }
}
