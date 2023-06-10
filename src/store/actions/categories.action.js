import axios from "axios";
import {FETCH_CATEGORIES_SUCCESS} from "./action.types";

// 'https://takeme-all.com/app/endpoints/categories/list?locale=ar';
// https://takeme-all.com/app/endpoints/products-types?locale=ar&categoryId=${id}&page=0


export const fetchCategories = () => async dispatch => {
    try {
        const res = await axios.get('https://takeme-all.com/app/endpoints/categories/list?locale=ar');
        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: res.data.output
        });
    }catch (err) {
        console.error(err.message);
    }
}