import axios from "axios";
import {END_FETCHING_CATEGORIES, FETCH_CATEGORIES_SUCCESS, START_FETCHING_CATEGORIES} from "./action.types";

// 'https://takeme-all.com/app/endpoints/categories/list?locale=ar';
// https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}

export const fetchCategories = () => async dispatch => {
    try {
        dispatch(startFetchingCategories);
        const res = await axios.get('https://takeme-all.com/app/endpoints/categories/list?locale=ar');
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: res.data.output
        });
        dispatch(endFetchingCategories);
    }catch (err) {
        console.error(err.message);
        dispatch(endFetchingCategories);
    }
}