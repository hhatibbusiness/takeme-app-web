import axios from "axios";
import {
    CHANGE_CURRENT_ID, CHANGE_FILTER, CHANGE_LAN_SUCCESS, CHANGE_SLIDER_VALUE,
    END_FETCHING_CATEGORIES, END_FETCHING_PRODUCTS, END_LOADING_MORE_PRODUCT_TYPES, ERROR_ACTIVE, ERROR_INACTIVE, FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_PRODUCTS, INCREASE_PAGE_NUMBER, RESET_PAGE_NUMBER,
    START_FETCHING_CATEGORIES,
    START_FETCHING_PRODUCTS,
    START_LOADING_MORE_PRODUCT_TYPES
} from "./action.types";
import {changeSearchCategoryId} from "./search.actions";
import {BASE_URL} from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";
import {getAnalytics, logEvent} from "firebase/analytics";

// 'https://takeme-all.com/app/endpoints/categories/list?locale=ar';
// https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}

export const errorActive = {
    type: ERROR_ACTIVE
}

export const errorInactive = {
    type: ERROR_INACTIVE
}

// change current selected category id action.
export const changeId = id => ({
    type: CHANGE_CURRENT_ID,
    id
})

// fetch the categories list
export const fetchCategories = (lan, filter, navigate) => async dispatch => {
    try {
        dispatch(startFetchingCategories);
        const res = await axios.get(`${BASE_URL}endpoints/categories/list?locale=${lan}`);
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: res.data.output
        });
        dispatch(endFetchingCategories);
        if(res?.data?.output?.length === 0) return;
        const firstId = res.data.output[0].id;
        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));
        dispatch(errorInactive);
    }catch (err) {
        console.error(err.message);
        dispatch(endFetchingCategories);
        if(err?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
        dispatch(errorActive);
    }
}

// ACTION TO KEEP THE UI FROM CRASHING
const startFetchingProducts = {
    type: START_FETCHING_PRODUCTS
};

const endFetchingProducts = {
    type: END_FETCHING_PRODUCTS
}

//fetch the category products list
export const fetchCategoryProducts = (id, lan, page, filter, navigate) => async dispatch => {
    try {
        if(page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/products-types?locale=${lan}&categoryId=${id}&page=${page}&filterByAction=${filter}`)
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products: res.data
        });
        dispatch(increasePageNumber());
        const analytics = getAnalytics();
        if(page > 0 && res.status == 200 && res?.data?.length > 0) {
            logEvent(analytics, 'pagination', {
                paginationName: 'procutType'
            })
        }
        dispatch(errorInactive)
        if(page == 0) dispatch(endFetchingProducts);
    } catch (e) {
        console.error(e?.response?.status);
        if(e?.response?.status == 401) {
            console.log('Error!')
            tokenUnautharizedMiddleware(navigate, '/login');
        }
        dispatch(endFetchingProducts);

        dispatch(errorActive)
    }
}

export const changeSliderValue = value => ({
    type: CHANGE_SLIDER_VALUE,
    value
});

export const changeLan = (lan, id) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_LAN_SUCCESS,
            lan
        });
        await dispatch(fetchCategories(lan));
        await dispatch(fetchCategoryProducts(id, lan, 0));
        dispatch(errorInactive)
    } catch (e) {
        console.error(e);
        dispatch(errorActive);
    }
};

//increase the page number action
export const increasePageNumber = () => ({
    type: INCREASE_PAGE_NUMBER
});

//reset the page number action
export const resetPageNumber = () => ({
    type: RESET_PAGE_NUMBER
});

export const changeFilter = filter => ({
    type: CHANGE_FILTER,
    filter: filter
});

export const startLoadingMoreProductTypes = {
    type: START_LOADING_MORE_PRODUCT_TYPES
}

export const endLoadingProductTypes = {
    type: END_LOADING_MORE_PRODUCT_TYPES
}