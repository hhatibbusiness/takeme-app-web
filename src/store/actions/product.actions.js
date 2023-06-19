import axios from 'axios';
import {FETCH_PRODUCT_TYPE_PROVIDERS, FETCH_PRODUCT_TYPE_DETAILS} from "./action.types";

export const fetchProductDetails = (id, page, lan) => async dispatch => {
    try {
        const res = await axios.get(`https://takeme-all.com/endpoints/providers-details?locale=${lan}&productTypeId=${id}&page=${page}`);
        // console.log(res.data);
        dispatch({
            type: FETCH_PRODUCT_TYPE_PROVIDERS,
            providers: res.data
        });
    } catch (e) {
        console.error(e.message);
    }
}

export const fetchProductTypeDetails = (id, lan) => async dispatch => {
    try {
        const res = await axios.get(`https://takeme-all.com/endpoints/product-type-details?locale=${lan}&productTypeId=${id}`);
        console.log(res);
        dispatch({
            type: FETCH_PRODUCT_TYPE_DETAILS,
            product: res.data
        });
    } catch (e) {
        console.error(e.message);
    }
}