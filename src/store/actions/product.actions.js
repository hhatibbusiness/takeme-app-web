import axios from 'axios';
import {
    FETCH_PRODUCT_TYPE_PROVIDERS,
    FETCH_PRODUCT_TYPE_DETAILS,
    RESET_ALL_PRODUCT_DATA,
    START_FETCHING_PROVIDERS_PRODUCTS,
    END_FETCHING_PROVIDERS_PRODUCTS,
    SET_GALLERY_OPEN,
    SET_GALLERY_CLOSE,
    INCREASE_FETCHING_PROVIDERS_PRODUCTS_PAGE,
    RESET_PROVIDERS_FETCHING_PAGE,
    CHANGE_CURRENT_PRODUCT_TYPE_ID
} from "./action.types";
import { BASE_URL } from '../../utls/assets';
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";
import {getAnalytics, logEvent} from "firebase/analytics";
import {loadUser} from "./login.action";

export const fetchProductDetails = (id, page, lan, filter, navigate) => async dispatch => {
    try {
        if(page == 0) dispatch(startFetchingProvidersProducts);
        const res = await axios.get(`${BASE_URL}endpoints/providers-details?locale=${lan}&productTypeId=${id}&page=${page}&filterByAction=${filter}`);
        dispatch({
            type: FETCH_PRODUCT_TYPE_PROVIDERS,
            providers: res.data.output
        });
        if(page > 0 && res.data.output.length > 0) {
            const analytics = getAnalytics();
            logEvent(analytics, 'pagination', {
                paginationName: 'product-type-providers'
            });
        }
        dispatch(increaseProvidersFetchingPage());
        dispatch(endFetchingProvidersProducts);
    } catch (e) {
        console.error(e.message);
        dispatch(endFetchingProvidersProducts);
        if(e?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
    }
}

export const fetchProductTypeDetails = (id, lan, navigate) => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}endpoints/product-type-details?locale=${lan}&productTypeId=${id}`);
        dispatch({
            type: FETCH_PRODUCT_TYPE_DETAILS,
            product: res.data
        });
    } catch (e) {
        console.error(e.message);
        if(e?.response?.status == 401) {
            dispatch(loadUser(navigate, lan));

        }
    }
}

//reset the product data action
export const resetProductData = () => ({
    type: RESET_ALL_PRODUCT_DATA
});

export const startFetchingProvidersProducts =  {
        type: START_FETCHING_PROVIDERS_PRODUCTS
};
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
});

export const changeCurrentProductTypeId = (id, lan, navigate, filter) => async dispatch => {
    try {
        dispatch(startFetchingProvidersProducts);
        navigate(`/product/${id}`);
        console.log();
        dispatch({
            type: CHANGE_CURRENT_PRODUCT_TYPE_ID,
            id
        });
        await dispatch(resetProductData());
        dispatch(fetchProductTypeDetails(id, lan, navigate));
        dispatch(fetchProductDetails(id, 0, lan, filter, navigate));
    } catch (e) {
        console.log(e.message);
    }
}