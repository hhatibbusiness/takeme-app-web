import axios from "axios";
import {
    CHANGE_CURRENT_ID,
    END_FETCHING_CATEGORIES, END_FETCHING_PRODUCTS,
    FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORY_PRODUCTS,
    START_FETCHING_CATEGORIES,
    START_FETCHING_PRODUCTS
} from "./action.types";

// 'https://takeme-all.com/app/endpoints/categories/list?locale=ar';
// https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}


// change current selected category id action.
export const changeId = id => ({
    type: CHANGE_CURRENT_ID,
    id
})

// fetch the categories list
export const fetchCategories = () => async dispatch => {
    try {
        dispatch(startFetchingCategories);
        const res = await axios.get('https://takeme-all.com/app/endpoints/categories/list?locale=ar');
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: res.data.output
        });
        await dispatch(endFetchingCategories);
        const firstId = res.data.output[0].id;
        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId));
    }catch (err) {
        console.error(err.message);
        dispatch(endFetchingCategories);
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
export const fetchCategoryProducts = id => async dispatch => {
    try {
        dispatch(startFetchingProducts);
        const res = await axios.get(`https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0`)
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products: res.data
        });
        dispatch(endFetchingProducts);
    } catch (e) {
        console.error(e.message);
        dispatch(endFetchingProducts);
    }
}