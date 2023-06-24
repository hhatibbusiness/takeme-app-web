import axios from 'axios';
import {
    FETCH_PRODUCT_TYPE_PROVIDERS,
    FETCH_PRODUCT_TYPE_DETAILS,
    RESET_ALL_PRODUCT_DATA,
    START_FETCHING_PROVIDERS_PRODUCTS,
    END_FETCHING_PROVIDERS_PRODUCTS,
    SET_GALLERY_OPEN,
    SET_GALLERY_CLOSE,
    INCREASE_FETCHING_PROVIDERS_PRODUCTS_PAGE, RESET_PROVIDERS_FETCHING_PAGE
} from "./action.types";

export const fetchProductDetails = (id, page, lan) => async dispatch => {
    try {
        dispatch(startFetchingProvidersProducts);
        const res = await axios.get(`https://takeme-all.com/endpoints/providers-details?locale=${lan}&productTypeId=${id}&page=${page}`);
        dispatch({
            type: FETCH_PRODUCT_TYPE_PROVIDERS,
            providers: res.data
        });
        dispatch(increaseProvidersFetchingPage());
        dispatch(endFetchingProvidersProducts);
    } catch (e) {
        console.error(e.message);
        dispatch(endFetchingProvidersProducts);
    }
}

export const fetchProductTypeDetails = (id, lan) => async dispatch => {
    try {
        const res = await axios.get(`https://takeme-all.com/endpoints/product-type-details?locale=${lan}&productTypeId=${id}`);
        dispatch({
            type: FETCH_PRODUCT_TYPE_DETAILS,
            product: res.data
        });
    } catch (e) {
        console.error(e.message);
    }
}

//reset the product data action
export const resetProductData = () => ({
    type: RESET_ALL_PRODUCT_DATA
});

export const startFetchingProvidersProducts = {
    type: START_FETCHING_PROVIDERS_PRODUCTS
}
export const endFetchingProvidersProducts = {
    type: END_FETCHING_PROVIDERS_PRODUCTS
}

export const openGallery = (product) => ({
    type: SET_GALLERY_OPEN,
    product: product
});

export const closeGallery = () => ({
    type: SET_GALLERY_CLOSE
});

export const increaseProvidersFetchingPage = () => ({
    type: INCREASE_FETCHING_PROVIDERS_PRODUCTS_PAGE
})

export const resetProvidersFetchingPage = () => ({
    type: RESET_PROVIDERS_FETCHING_PAGE
})