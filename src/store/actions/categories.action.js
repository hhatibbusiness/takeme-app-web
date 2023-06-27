import axios from "axios";
import {
    CHANGE_CURRENT_ID, CHANGE_LAN_SUCCESS, CHANGE_SLIDER_VALUE,
    END_FETCHING_CATEGORIES, END_FETCHING_PRODUCTS, ERROR_ACTIVE, ERROR_INACTIVE, FETCH_CATEGORIES_FAILURE,
    FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_PRODUCTS, INCREASE_PAGE_NUMBER, RESET_PAGE_NUMBER,
    START_FETCHING_CATEGORIES,
    START_FETCHING_PRODUCTS
} from "./action.types";
import {changeSearchCategoryId} from "./search.actions";

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
export const fetchCategories = lan => async dispatch => {
    try {
        dispatch(startFetchingCategories);
        const res = await axios.get(`https://takeme-all.com/app/endpoints/categories/list?locale=${lan}`);
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: res.data.output
        });
        await dispatch(endFetchingCategories);
        const firstId = res.data.output[0].id;
        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId, lan, 0));
        dispatch(errorInactive);
    }catch (err) {
        console.error(err.message);
        dispatch(endFetchingCategories);
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
export const fetchCategoryProducts = (id, lan, page) => async dispatch => {
    try {
        dispatch(startFetchingProducts);
        const res = await axios.get(`https://takeme-all.com/app/endpoints/products-types?locale=${lan}&categoryId=${id}&page=${page}`)
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products: res.data
        });
        dispatch(endFetchingProducts);
        dispatch(increasePageNumber());
        dispatch(errorInactive)
    } catch (e) {
        console.error(e.message);
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
        console.error(e.message);
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
})